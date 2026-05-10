export interface SubmissionExamSummary {
  id: string;
  title: string;
  duration: number;
}

export interface Submission {
  id: string;
  userId: string;
  examId: string;
  examTitle: string;
  exam: SubmissionExamSummary;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  startedAt: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}
