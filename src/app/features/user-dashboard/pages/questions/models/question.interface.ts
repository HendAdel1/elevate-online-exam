export interface QuestionAnswer {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface Question {
  id: string;
  text: string;
  examId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  answers: QuestionAnswer[];
  exam?: { id: string; title: string };
}

export interface GetQuestionsForExamResponse {
  status: boolean;
  code: number;
  payload: {
    questions: Question[];
  };
}
