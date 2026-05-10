import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import type { GetSubmissionDetailResponse } from '../models/submission-detail.models';
import type { GetSubmissionsParams, GetSubmissionsResponse } from '../models/submissions-list.models';
import type { SubmitExamRequest, SubmitExamResponse } from '../models/submit-exam.models';

@Injectable({
  providedIn: 'root',
})
export class SubmissionsService {
  private readonly http = inject(HttpClient);

  submitExam(body: SubmitExamRequest): Observable<SubmitExamResponse> {
    return this.http.post<SubmitExamResponse>(
      `${environment.apiBaseUrl}/submissions`,
      body
    );
  }

  getSubmissionById(id: string): Observable<GetSubmissionDetailResponse> {
    return this.http.get<GetSubmissionDetailResponse>(
      `${environment.apiBaseUrl}/submissions/${id}`
    );
  }

  getSubmissions(params: GetSubmissionsParams = {}): Observable<GetSubmissionsResponse> {
    let httpParams = new HttpParams();
    if (params.examId != null) httpParams = httpParams.set('examId', params.examId);
    if (params.page != null) httpParams = httpParams.set('page', params.page);
    if (params.limit != null) httpParams = httpParams.set('limit', params.limit);
    if (params.search != null && params.search !== '')
      httpParams = httpParams.set('search', params.search);

    return this.http.get<GetSubmissionsResponse>(`${environment.apiBaseUrl}/submissions`, {
      params: httpParams,
    });
  }
}
