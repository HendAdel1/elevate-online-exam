import type { Submission } from './submission-core.model';
import type { SubmissionAnalyticsItem } from './submission-detail.models';

export interface SubmitExamAnswerItem {
  questionId: string;
  answerId: string;
}

export interface SubmitExamRequest {
  examId: string;
  answers: SubmitExamAnswerItem[];
  startedAt: string;
}

export interface SubmitExamResponse {
  status: boolean;
  code: number;
  payload: {
    submission: Submission;
    analytics?: SubmissionAnalyticsItem[];
  };
}
