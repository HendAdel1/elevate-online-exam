import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { SubmitExamRequest, SubmitExamResponse } from '../models/submission.interface';

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
}
