import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { GetQuestionsForExamResponse } from '../models/question.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private readonly http = inject(HttpClient);

  getQuestionsForExam(examId: string): Observable<GetQuestionsForExamResponse> {
    return this.http.get<GetQuestionsForExamResponse>(
      `${environment.apiBaseUrl}/questions/exam/${examId}`
    );
  }
}
