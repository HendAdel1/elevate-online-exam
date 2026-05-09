import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { GetExamResponse, GetExamsResponse } from '../models/exam.interface';
import { environment } from '../../../../../../environments/environment';

export interface GetExamsParams {
    diplomaId?: string;
    page?: number;
    limit?: number;
}

@Injectable({
    providedIn: 'root',
})
export class ExamsService {
    private readonly http = inject(HttpClient);

    getExams(params: GetExamsParams = {}): Observable<GetExamsResponse> {
        let httpParams = new HttpParams();
        if (params.diplomaId) httpParams = httpParams.set('diplomaId', params.diplomaId);
        if (params.page != null) httpParams = httpParams.set('page', params.page);
        if (params.limit != null) httpParams = httpParams.set('limit', params.limit);

        return this.http.get<GetExamsResponse>(
            `${environment.apiBaseUrl}/exams`,
            { params: httpParams }
        );
    }

    getExamById(id: string): Observable<GetExamResponse> {
        return this.http.get<GetExamResponse>(
            `${environment.apiBaseUrl}/exams/${id}`
        );
    }
}
