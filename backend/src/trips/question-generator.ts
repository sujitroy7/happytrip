import type { TripState } from './schemas/trip-state.schema.js';
import type { DynamicFormQuestion, QuestionItem } from './trips.types.js';

export class QuestionGenerator {
  /**
   * Generates a complete dynamic form schema for the frontend with prefilled values.
   */
  static generateDynamicForm(state: TripState): DynamicFormQuestion[] {
    return [
      {
        key: 'destination',
        question: 'Where would you like to travel?',
        field_type: 'input_field',
        placeholder: 'e.g. Tokyo, Japan',
        value: state.destination || null,
        required: true,
      },
      {
        key: 'origin',
        question: 'Where are you starting your trip from?',
        field_type: 'input_field',
        placeholder: 'e.g. New York, Bangalore, London',
        value: state.origin || null,
        required: false,
      },
      {
        key: 'duration_days',
        question: 'Trip Duration',
        field_type: 'number_range_slider',
        min: 1,
        max: 30,
        step: 1,
        unit: 'days',
        value: state.duration_days ?? 7,
        required: true,
      },
      {
        key: 'traveler_type',
        question: 'Who are you traveling with?',
        field_type: 'single_option',
        options: ['solo', 'couple', 'family', 'friends', 'group'],
        value: state.traveler_type || null,
        required: true,
      },
      {
        key: 'traveler_count',
        question: 'Number of Travelers',
        field_type: 'number_range_slider',
        min: 1,
        max: 20,
        step: 1,
        unit: 'people',
        value:
          state.traveler_count ??
          (state.traveler_type === 'couple' ? 2 : state.traveler_type === 'solo' ? 1 : 2),
        required: false,
      },
      {
        key: 'budget',
        question: 'What is your preferred budget range?',
        field_type: 'single_option',
        options: ['budget', 'moderate', 'luxury'],
        value: state.budget || null,
        required: false,
      },
      {
        key: 'interests',
        question: 'What experiences are you most interested in?',
        field_type: 'multiple_option',
        options: [
          'Sightseeing & Landmarks',
          'Food & Culinary',
          'Culture & History',
          'Nature & Outdoors',
          'Shopping',
          'Nightlife & Entertainment',
          'Relaxation & Wellness',
          'Anime, Manga & Gaming',
        ],
        min_selection: 1,
        max_selection: 5,
        value: Array.isArray(state.interests) && state.interests.length > 0 ? state.interests : [],
        required: false,
      },
      {
        key: 'food_preference',
        question: 'Any dietary preferences?',
        field_type: 'single_option',
        options: ['Vegetarian', 'Vegan', 'Non-vegetarian', 'Halal', 'No preference'],
        value: state.food_preference || null,
        required: false,
      },
      {
        key: 'special_notes',
        question: 'Special requests or notes',
        field_type: 'text_area',
        placeholder:
          'e.g. Prefer relaxed mornings, wheelchair accessibility, first-time visitor recommendations...',
        value: (state as any).special_notes || '',
        required: false,
      },
    ];
  }

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

