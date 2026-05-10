import type { Submission } from './submission-core.model';

export interface SubmissionAnalyticsItem {
  questionId: string;
  questionText: string;
  selectedAnswer: { id?: string; text?: string } | null;
  isCorrect: boolean;
  correctAnswer?: { id?: string; text?: string } | null;
  answers?: Array<{
    id?: string;
    text?: string;
    isCorrect?: boolean;
    isSelected?: boolean;
  }>;
}

export interface GetSubmissionDetailResponse {
  status: boolean;
  code: number;
  payload: {
    submission: Submission;
    analytics: SubmissionAnalyticsItem[];
  };
}
