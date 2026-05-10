import type { Submission } from './submission-core.model';

export interface SubmissionsListMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetSubmissionsResponse {
  status: boolean;
  code: number;
  payload: {
    data: Submission[];
    metadata?: SubmissionsListMetadata;
  };
}

export interface GetSubmissionsParams {
  examId?: string;
  page?: number;
  limit?: number;
  search?: string;
}
