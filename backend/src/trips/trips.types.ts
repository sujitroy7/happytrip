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

export type DynamicFormFieldType =
  | 'single_option'
  | 'multiple_option'
  | 'number_range_slider'
  | 'input_field'
  | 'text_area';

export interface DynamicFormQuestion {
  key: string;
  question: string;
  field_type: DynamicFormFieldType;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  min_selection?: number;
  max_selection?: number;
  unit?: string;
  currency?: string;
  placeholder?: string;
  value: any;
  required?: boolean;
}

export interface DynamicFormResponse {
  sessionId: string;
  status: string;
  questions: DynamicFormQuestion[];
}

export interface InitiateTripResponse {
  sessionId: string;
  status: string;
  extracted: Record<string, any>;
}

export interface EnqueuedPlanJob {
  jobId: string;
  queue: string;
  status: 'queued';
  enqueuedAt: string;
  sessionId: string;
  payload: Record<string, any>;
}

export interface GeneratePlanResponse {
  sessionId: string;
  jobId: string;
  status: 'queued';
  message: string;
}

