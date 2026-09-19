import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TripsService } from './trips.service.js';
import { ChatTripDto } from './dto/chat-trip.dto.js';
import { InitiateTripDto } from './dto/initiate-trip.dto.js';
import { GenerateTripPlanDto } from './dto/generate-trip-plan.dto.js';
import type {
  ChatTripResponse,
  DynamicFormResponse,
  GeneratePlanResponse,
  InitiateTripResponse,
} from './trips.types.js';

@ApiTags('trips')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  /**
   * Step 1: User enters a natural language prompt, backend extracts entities,
   * creates a session, and returns the sessionId with extracted data.
   */
  @Post('initiate')
  @ApiOperation({
    summary: 'Initiate a trip session from natural language prompt',
    description:
      'Extracts trip entities with Gemini AI, initializes session, and determines required missing slots.',
  })
  async initiate(@Body() dto: InitiateTripDto): Promise<InitiateTripResponse> {
    return this.tripsService.initiateTrip(dto.prompt);
  }

  /**
   * Step 2: Frontend requests the dynamic questionnaire form with prefilled values
   * for the given sessionId.
   */
  @Get(':id/form')
  @ApiOperation({
    summary: 'Get dynamic questionnaire form for trip session',
    description:
      'Generates dynamic questionnaire schema prefilled with already-known slot values.',
  })
  @ApiParam({ name: 'id', description: 'Session ID' })
  async getForm(@Param('id') id: string): Promise<DynamicFormResponse> {
    return this.tripsService.getDynamicForm(id);
  }

  /**
   * Step 3: Frontend submits final form values; backend updates state and
   * creates a RabbitMQ job (mock) to generate the plan.
   */
  @Post(':id/generate')
  @ApiOperation({
    summary: 'Submit questionnaire answers and trigger plan generation',
    description:
      'Submits final form answers for session and queues plan generation.',
  })
  @ApiParam({ name: 'id', description: 'Session ID' })
  async generatePlan(
    @Param('id') id: string,
    @Body() dto: GenerateTripPlanDto,
  ): Promise<GeneratePlanResponse> {
    return this.tripsService.generatePlan(id, dto.answers);
  }

  @Post('chat')
  @ApiOperation({
    summary: 'Send conversational chat turn or answer updates',
    description:
      'Processes a multi-turn chat message, extracting slots or clarifying travel details.',
  })
  async chat(@Body() dto: ChatTripDto): Promise<ChatTripResponse> {
    return this.tripsService.handleChat(dto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve trip session by ID',
    description: 'Fetches the current state, slots, and metadata of a trip session.',
  })
  @ApiParam({ name: 'id', description: 'Session ID' })
  async getSession(@Param('id') id: string) {
    return this.tripsService.getSession(id);
  }
}


