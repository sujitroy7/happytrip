import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';
import type { TripState } from '../trips/schemas/trip-state.schema.js';

export interface ExtractedTripData {
  origin?: string | null;
  destination?: string | null;
  start_date?: string | null;
  duration_days?: number | null;
  traveler_type?: string | null;
  traveler_count?: number | null;
  budget?: {
    min?: number | null;
    max?: number | null;
    currency?: string;
    tier?: string | null;
  } | null;
  food_preference?: string | null;
  transport_preference?: string | null;
  interests?: string[];
  accommodation_preference?: string | null;
}

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private readonly client: GoogleGenAI | null = null;
  private readonly modelName = 'gemini-2.5-flash';

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('app.geminiApiKey');
    if (apiKey && apiKey.trim() !== '' && apiKey !== 'your_gemini_api_key_here') {
      this.client = new GoogleGenAI({ apiKey });
      this.logger.log('Gemini AI client initialized successfully.');
    } else {
      this.logger.warn(
        'GEMINI_API_KEY is not configured. Falling back to heuristic entity extraction for local testing.',
      );
    }
  }

  async extractTripEntities(
    userMessage: string,
    currentState?: Partial<TripState>,
    conversationHistory?: Array<{ role: string; content: string }>,
  ): Promise<ExtractedTripData> {
    if (!this.client) {
      return this.heuristicExtraction(userMessage, currentState);
    }

    const systemInstruction = `You are an expert travel entity extractor for HappyTrip.
Analyze the user message, the current trip state, and recent conversation history.
Extract or update travel parameters and return a JSON object with this exact schema:
{
  "origin": string | null,
  "destination": string | null,
  "start_date": string | null,
  "duration_days": number | null,
  "traveler_type": "Solo" | "Couple" | "Family" | "Friends" | "Group" | null,
  "traveler_count": number | null,
  "budget": {
    "min": number | null,
    "max": number | null,
    "currency": string,
    "tier": string | null
  } | null,
  "food_preference": "Vegetarian" | "Vegan" | "Non-vegetarian" | "No preference" | null,
  "transport_preference": string | null,
  "interests": string[],
  "accommodation_preference": string | null
}
Rules:
- Preserve previously confirmed fields from Current State unless the user explicitly changes or updates them.
- If the user provides new details (e.g. duration, interests, food), merge them.
- If not mentioned and not in Current State, return null (or empty array for interests).
- Output ONLY valid JSON.`;

    const recentHistoryText = conversationHistory && conversationHistory.length > 0
      ? conversationHistory
          .slice(-6)
          .map((m) => `${m.role}: ${m.content}`)
          .join('\n')
      : 'None';

    const prompt = `Recent Conversation Context:
${recentHistoryText}

Current Trip State:
${JSON.stringify(currentState || {}, null, 2)}

User's Latest Message:
"${userMessage}"`;

    try {
      const response = await this.client.models.generateContent({
        model: this.modelName,
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.1,
        },
      });

      const text = response.text?.trim();
      if (!text) {
        return this.heuristicExtraction(userMessage, currentState);
      }

      return JSON.parse(text) as ExtractedTripData;
    } catch (error) {
      this.logger.error('Gemini extraction error, falling back to heuristic:', error);
      return this.heuristicExtraction(userMessage, currentState);
    }
  }

  /**
   * Fast rule-based heuristic extractor used when GEMINI_API_KEY is not set or as fallback.
   */
  private heuristicExtraction(
    message: string,
    currentState?: Partial<TripState>,
  ): ExtractedTripData {
    const text = message.trim();
    const result: ExtractedTripData = {
      origin: currentState?.origin ?? null,
      destination: currentState?.destination ?? null,
      start_date: currentState?.start_date ?? null,
      duration_days: currentState?.duration_days ?? null,
      traveler_type: currentState?.traveler_type ?? null,
      traveler_count: currentState?.traveler_count ?? null,
      budget: currentState?.budget ?? null,
      food_preference: currentState?.food_preference ?? null,
      transport_preference: currentState?.transport_preference ?? null,
      interests: currentState?.interests ? [...currentState.interests] : [],
      accommodation_preference: currentState?.accommodation_preference ?? null,
    };

    // Pattern: "from <origin> to <destination>"
    const fromToMatch = text.match(/from\s+([A-Za-z\s]+?)\s+to\s+([A-Za-z\s]+?)(?:[.,;]|$|\s+for|\s+with|\s+under)/i);
    if (fromToMatch) {
      result.origin = fromToMatch[1].trim();
      result.destination = fromToMatch[2].trim();
    } else {
      // Pattern: "trip to <destination>"
      const toMatch = text.match(/to\s+([A-Za-z\s]+?)(?:[.,;]|$|\s+for|\s+with)/i);
      if (toMatch && !result.destination) {
        result.destination = toMatch[1].trim();
      }
    }

    // Duration extraction: e.g. "3 days", "2-day", "weekend", "4 nights"
    const durationMatch = text.match(/(\d+)\s*(?:days?|nights?|day)/i);
    if (durationMatch) {
      result.duration_days = parseInt(durationMatch[1], 10);
    } else if (/weekend/i.test(text)) {
      result.duration_days = 2;
    }

    // Traveler type
    if (/solo/i.test(text)) {
      result.traveler_type = 'Solo';
      result.traveler_count = 1;
    } else if (/couple/i.test(text)) {
      result.traveler_type = 'Couple';
      result.traveler_count = 2;
    } else if (/family/i.test(text)) {
      result.traveler_type = 'Family';
    } else if (/friends/i.test(text)) {
      result.traveler_type = 'Friends';
    } else if (/group/i.test(text)) {
      result.traveler_type = 'Group';
    }

    // Food preferences
    if (/non-?veg(?:etarian)?/i.test(text)) {
      result.food_preference = 'Non-vegetarian';
    } else if (/vegan/i.test(text)) {
      result.food_preference = 'Vegan';
    } else if (/veg(?:etarian)?/i.test(text)) {
      result.food_preference = 'Vegetarian';
    } else if (/no\s+preference/i.test(text)) {
      result.food_preference = 'No preference';
    }

    // Interests: waterfalls, nature, nightlife, trekking, heritage, etc.
    const interestKeywords = [
      'waterfall',
      'waterfalls',
      'nature',
      'nightlife',
      'beach',
      'beaches',
      'trekking',
      'hiking',
      'temples',
      'heritage',
      'coffee plantation',
      'foodie',
      'adventure',
      'relaxing',
      'wildlife',
    ];

    const lower = text.toLowerCase();
    for (const kw of interestKeywords) {
      if (lower.includes(kw) && !result.interests?.includes(kw)) {
        result.interests = result.interests || [];
        result.interests.push(kw);
      }
    }

    return result;
  }
}
