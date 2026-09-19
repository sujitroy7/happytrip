import type { TripState } from './schemas/trip-state.schema.js';
import type { QuestionItem } from './trips.types.js';

export class QuestionGenerator {
  /**
   * Fields considered important to ask about.
   */
  private static readonly QUESTION_SPECS: Record<string, QuestionItem> = {
    duration_days: {
      key: 'duration_days',
      label: 'Trip duration',
      type: 'single_choice',
      options: ['2 days', '3 days', '4 days', 'Custom'],
      allowSkip: true,
    },
    traveler_type: {
      key: 'traveler_type',
      label: 'Travelers',
      type: 'single_choice',
      options: ['Solo', 'Couple', 'Family', 'Friends', 'Group'],
      allowSkip: true,
    },
    budget: {
      key: 'budget',
      label: 'Budget',
      type: 'range',
      min: 5000,
      max: 50000,
      currency: 'INR',
      allowSkip: true,
    },
    food_preference: {
      key: 'food_preference',
      label: 'Food',
      type: 'single_choice',
      options: ['Vegetarian', 'Vegan', 'Non-vegetarian', 'No preference'],
      allowSkip: true,
    },
    interests: {
      key: 'interests',
      label: 'Anything specific you want from this trip?',
      type: 'free_text',
      placeholder: 'e.g. waterfalls, nature, nightlife, nothing too crowded...',
      allowSkip: true,
    },
  };

  /**
   * Detects missing fields that have not been answered or skipped.
   */
  static detectMissingFields(state: TripState, skippedFields: string[] = []): string[] {
    const missing: string[] = [];

    if (!state.origin) missing.push('origin');
    if (!state.destination) missing.push('destination');

    const preferenceKeys = ['duration_days', 'traveler_type', 'budget', 'food_preference', 'interests'];

    for (const key of preferenceKeys) {
      if (skippedFields.includes(key)) continue;

      const val = (state as any)[key];
      if (val === null || val === undefined || (Array.isArray(val) && val.length === 0)) {
        missing.push(key);
      }
    }

    return missing;
  }

  /**
   * Generates the questionnaire based on detected missing fields.
   */
  static generateQuestionnaire(missingFields: string[]): QuestionItem[] {
    const questions: QuestionItem[] = [];

    if (missingFields.includes('origin')) {
      questions.push({
        key: 'origin',
        label: 'Where are you starting your trip from?',
        type: 'free_text',
        placeholder: 'e.g. Bangalore, Mumbai, Delhi',
      });
    }

    if (missingFields.includes('destination')) {
      questions.push({
        key: 'destination',
        label: 'Where would you like to travel?',
        type: 'free_text',
        placeholder: 'e.g. Coorg, Goa, Manali',
      });
    }

    for (const key of ['duration_days', 'traveler_type', 'budget', 'food_preference', 'interests']) {
      if (missingFields.includes(key) && this.QUESTION_SPECS[key]) {
        questions.push(this.QUESTION_SPECS[key]);
      }
    }

    return questions;
  }
}
