import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TripsService } from './trips.service.js';
import { GeminiService } from '../gemini/gemini.service.js';

describe('TripsService & Questionnaire Flow', () => {
  let tripsService: TripsService;
  let mockGeminiService: Partial<GeminiService>;
  let mockModelInstance: any;
  let MockTripSessionModel: any;

  beforeEach(() => {
    mockModelInstance = {
      _id: 'session_mock_123',
      status: 'collecting_info',
      state: {
        origin: null,
        destination: null,
        start_date: null,
        duration_days: null,
        traveler_type: null,
        traveler_count: null,
        budget: null,
        food_preference: null,
        transport_preference: null,
        interests: [],
        accommodation_preference: null,
      },
      skipped_fields: [],
      messages: [],
      markModified: vi.fn(),
      save: vi.fn().mockResolvedValue(true),
    };

    MockTripSessionModel = vi.fn().mockImplementation(function (init: any) {
      Object.assign(this, mockModelInstance, init);
      return this;
    });

    MockTripSessionModel.findById = vi.fn().mockReturnValue({
      exec: vi.fn().mockResolvedValue(mockModelInstance),
    });

    mockGeminiService = {
      extractTripEntities: vi.fn().mockImplementation(async (_msg: string) => {
        // Mock extraction for "Plan me a trip from Bangalore to Coorg"
        return {
          origin: 'Bangalore',
          destination: 'Coorg',
          start_date: null,
          duration_days: null,
          traveler_type: null,
          traveler_count: null,
          budget: null,
          food_preference: null,
          transport_preference: null,
          interests: [],
          accommodation_preference: null,
        };
      }),
    };

    tripsService = new TripsService(
      MockTripSessionModel as any,
      mockGeminiService as GeminiService,
    );
  });

  it('Step 1: extracts origin/destination and returns questionnaire for initial prompt', async () => {
    const response = await tripsService.handleChat({
      message: 'Plan me a trip from Bangalore to Coorg.',
    });

    expect(response.sessionId).toBe('session_mock_123');
    expect(response.status).toBe('collecting_info');
    expect(response.reply).toBe('Absolutely! A few quick details so I can personalize it.');
    expect(response.tripState.origin).toBe('Bangalore');
    expect(response.tripState.destination).toBe('Coorg');
    expect(response.isReadyForPlanning).toBe(false);

    // Verify questionnaire has duration, travelers, budget, food, interests
    const questionKeys = response.questionnaire.map((q) => q.key);
    expect(questionKeys).toContain('duration_days');
    expect(questionKeys).toContain('traveler_type');
    expect(questionKeys).toContain('budget');
    expect(questionKeys).toContain('food_preference');
    expect(questionKeys).toContain('interests');

    const durationQuestion = response.questionnaire.find((q) => q.key === 'duration_days');
    expect(durationQuestion?.options).toEqual(['2 days', '3 days', '4 days', 'Custom']);

    const travelersQuestion = response.questionnaire.find((q) => q.key === 'traveler_type');
    expect(travelersQuestion?.options).toEqual(['Solo', 'Couple', 'Family', 'Friends', 'Group']);

    const foodQuestion = response.questionnaire.find((q) => q.key === 'food_preference');
    expect(foodQuestion?.options).toEqual(['Vegetarian', 'Vegan', 'Non-vegetarian', 'No preference']);
  });

  it('Step 2: updates state when user provides answers or skips fields and marks ready', async () => {
    mockModelInstance.state.origin = 'Bangalore';
    mockModelInstance.state.destination = 'Coorg';

    const response = await tripsService.handleChat({
      sessionId: 'session_mock_123',
      answers: {
        duration_days: 3,
        traveler_type: 'Couple',
        budget: { min: 5000, max: 25000, currency: 'INR' },
        food_preference: 'Non-vegetarian',
        interests: ['waterfalls', 'nature', 'nightlife'],
      },
    });

    expect(response.tripState.duration_days).toBe(3);
    expect(response.tripState.traveler_type).toBe('Couple');
    expect(response.tripState.food_preference).toBe('Non-vegetarian');
    expect(response.tripState.interests).toContain('waterfalls');
    expect(response.missingFields.length).toBe(0);
    expect(response.isReadyForPlanning).toBe(true);
    expect(response.status).toBe('ready');
  });

  it('Step 3: handles skipped fields gracefully', async () => {
    mockModelInstance.state.origin = 'Bangalore';
    mockModelInstance.state.destination = 'Coorg';
    mockModelInstance.state.duration_days = 2;

    const response = await tripsService.handleChat({
      sessionId: 'session_mock_123',
      skippedFields: ['traveler_type', 'budget', 'food_preference', 'interests'],
    });

    expect(response.missingFields.length).toBe(0);
    expect(response.isReadyForPlanning).toBe(true);
    expect(response.status).toBe('ready');
  });
});
