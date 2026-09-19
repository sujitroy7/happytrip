import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TripSession, type TripSessionDocument } from './schemas/trip-session.schema.js';
import { TripState } from './schemas/trip-state.schema.js';
import { GeminiService } from '../gemini/gemini.service.js';
import { QuestionGenerator } from './question-generator.js';
import { TripsQueueService } from './trips-queue.service.js';
import type { ChatTripDto } from './dto/chat-trip.dto.js';
import type {
  ChatTripResponse,
  DynamicFormResponse,
  GeneratePlanResponse,
  InitiateTripResponse,
} from './trips.types.js';

@Injectable()
export class TripsService {
  constructor(
    @InjectModel(TripSession.name)
    private readonly tripSessionModel: Model<TripSessionDocument>,
    private readonly geminiService: GeminiService,
    private readonly tripsQueueService: TripsQueueService,
  ) {}


  async handleChat(dto: ChatTripDto): Promise<ChatTripResponse> {
    let session: TripSessionDocument;

    if (dto.sessionId) {
      const found = await this.tripSessionModel.findById(dto.sessionId).exec();
      if (!found) {
        throw new NotFoundException(`Trip session with id ${dto.sessionId} not found`);
      }
      session = found;
    } else {
      session = new this.tripSessionModel({
        status: 'collecting_info',
        state: new TripState(),
        skipped_fields: [],
        messages: [],
      });
    }

    // 1. Process free-form user message if provided
    if (dto.message && dto.message.trim().length > 0) {
      session.messages.push({
        role: 'user',
        content: dto.message,
        timestamp: new Date(),
      });

      const extracted = await this.geminiService.extractTripEntities(
        dto.message,
        session.state as Partial<TripState>,
        session.messages,
      );

      this.mergeState(session.state, extracted);
    }

    // 2. Process explicit questionnaire answers if provided
    if (dto.answers && Object.keys(dto.answers).length > 0) {
      this.mergeState(session.state, dto.answers);
    }

    // 3. Process explicitly skipped fields
    if (dto.skippedFields && dto.skippedFields.length > 0) {
      const set = new Set([...session.skipped_fields, ...dto.skippedFields]);
      session.skipped_fields = Array.from(set);
    }

    // 4. Detect missing information
    const missingFields = QuestionGenerator.detectMissingFields(
      session.state,
      session.skipped_fields,
    );
    const questionnaire = QuestionGenerator.generateQuestionnaire(missingFields);

    const isReadyForPlanning =
      Boolean(session.state.origin) &&
      Boolean(session.state.destination) &&
      missingFields.length === 0;

    let reply: string;
    if (isReadyForPlanning) {
      session.status = 'ready';
      reply = `Awesome! I have all the details needed for your trip to ${session.state.destination}. Ready to generate your itinerary!`;
    } else {
      session.status = 'collecting_info';
      reply = 'Absolutely! A few quick details so I can personalize it.';
    }

    session.messages.push({
      role: 'assistant',
      content: reply,
      timestamp: new Date(),
    });

    session.markModified('state');
    session.markModified('skipped_fields');
    session.markModified('messages');
    await session.save();

    return {
      sessionId: session._id.toString(),
      status: session.status,
      reply,
      tripState: session.state as unknown as Record<string, any>,
      missingFields,
      questionnaire,
      isReadyForPlanning,
    };
  }

  async getSession(id: string): Promise<TripSessionDocument> {
    const session = await this.tripSessionModel.findById(id).exec();
    if (!session) {
      throw new NotFoundException(`Trip session with id ${id} not found`);
    }
    return session;
  }

  /**
   * Step 1: Initiates a trip from natural language prompt, extracts entities,
   * creates a session, and returns the sessionId.
   */
  async initiateTrip(prompt: string): Promise<InitiateTripResponse> {
    const initialSession = new this.tripSessionModel({
      status: 'collecting_info',
      state: new TripState(),
      skipped_fields: [],
      messages: [
        {
          role: 'user',
          content: prompt,
          timestamp: new Date(),
        },
      ],
    });

    // Extract entities using Gemini LLM
    const extracted = await this.geminiService.extractTripEntities(
      prompt,
      initialSession.state as Partial<TripState>,
      initialSession.messages,
    );

    this.mergeState(initialSession.state, extracted);

    initialSession.markModified('state');
    initialSession.markModified('messages');
    await initialSession.save();

    return {
      sessionId: initialSession._id.toString(),
      status: initialSession.status,
      extracted: initialSession.state as unknown as Record<string, any>,
    };
  }

  /**
   * Step 2: Returns the complete dynamic form schema with prefilled values
   * based on extracted/accumulated session state.
   */
  async getDynamicForm(sessionId: string): Promise<DynamicFormResponse> {
    const session = await this.getSession(sessionId);
    const questions = QuestionGenerator.generateDynamicForm(session.state);

    return {
      sessionId: session._id.toString(),
      status: session.status,
      questions,
    };
  }

  /**
   * Step 3: Accepts the finalized answers, updates state, sets status to planning,
   * and creates/enqueues a RabbitMQ job (mocked).
   */
  async generatePlan(sessionId: string, answers?: Record<string, any>): Promise<GeneratePlanResponse> {
    const session = await this.getSession(sessionId);

    if (answers && Object.keys(answers).length > 0) {
      this.mergeState(session.state, answers);
    }

    session.status = 'planning';
    session.markModified('state');

    // Enqueue job to RabbitMQ (mock)
    const job = await this.tripsQueueService.enqueuePlanJob(
      sessionId,
      session.state as unknown as Record<string, any>,
    );

    await session.save();

    return {
      sessionId: session._id.toString(),
      jobId: job.jobId,
      status: 'queued',
      message: 'Trip planning job has been enqueued to RabbitMQ.',
    };
  }


  private mergeState(target: TripState, incoming: Record<string, any>): void {
    if (incoming.origin !== undefined && incoming.origin !== null) {
      target.origin = incoming.origin;
    }
    if (incoming.destination !== undefined && incoming.destination !== null) {
      target.destination = incoming.destination;
    }
    if (incoming.start_date !== undefined) {
      target.start_date = incoming.start_date;
    }
    if (incoming.duration_days !== undefined && incoming.duration_days !== null) {
      if (typeof incoming.duration_days === 'string') {
        const parsed = parseInt(incoming.duration_days, 10);
        if (!isNaN(parsed)) target.duration_days = parsed;
      } else {
        target.duration_days = incoming.duration_days;
      }
    }
    if (incoming.traveler_type !== undefined) {
      target.traveler_type = incoming.traveler_type;
    }
    if (incoming.traveler_count !== undefined) {
      target.traveler_count = incoming.traveler_count;
    }
    if (incoming.budget !== undefined) {
      target.budget = incoming.budget;
    }
    if (incoming.food_preference !== undefined) {
      target.food_preference = incoming.food_preference;
    }
    if (incoming.transport_preference !== undefined) {
      target.transport_preference = incoming.transport_preference;
    }
    if (incoming.interests !== undefined) {
      if (Array.isArray(incoming.interests)) {
        const set = new Set([...(target.interests || []), ...incoming.interests]);
        target.interests = Array.from(set);
      } else if (typeof incoming.interests === 'string') {
        const trimmed = incoming.interests.trim();
        if (trimmed && !(target.interests || []).includes(trimmed)) {
          target.interests = [...(target.interests || []), trimmed];
        }
      }
    }
    if (incoming.accommodation_preference !== undefined) {
      target.accommodation_preference = incoming.accommodation_preference;
    }
  }
}
