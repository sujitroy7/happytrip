export type QuestionType = 'single_choice' | 'multiple_choice' | 'range' | 'free_text';

export interface QuestionItem {
  key: string;
  label: string;
  type: QuestionType;
  options?: string[];
  min?: number;
  max?: number;
  currency?: string;
  placeholder?: string;
  allowSkip?: boolean;
}

export interface ChatTripResponse {
  sessionId: string;
  status: string;
  reply: string;
  tripState: Record<string, any>;
  missingFields: string[];
  questionnaire: QuestionItem[];
  isReadyForPlanning: boolean;
}
