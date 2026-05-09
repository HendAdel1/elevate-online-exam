export interface Exam {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  questionsCount: number;
  diplomaId: string;
  diploma: { id: string; title: string };
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetExamsResponse {
  status: boolean;
  code: number;
  payload: {
    data: Exam[];
    metadata: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface GetExamResponse {
  status?: boolean;
  code?: number;
  exam?: Exam;
  payload?:
    | Exam
    | {
        data?: Exam;
        exam?: Exam;
      };
}
