import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { GetDiplomaResponse, GetDiplomasResponse } from '../models/diploma.interface';
import type { GetDiplomasParams } from '../models/get-diplomas-params.interface';
import { environment } from '../../../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class DiplomasService {
    private readonly http = inject(HttpClient);

    getDiplomas(params: GetDiplomasParams = {}): Observable<GetDiplomasResponse> {
        let httpParams = new HttpParams();
        if (params.page != null) httpParams = httpParams.set('page', params.page);
        if (params.limit != null) httpParams = httpParams.set('limit', params.limit);

        return this.http.get<GetDiplomasResponse>(
            `${environment.apiBaseUrl}/diplomas`,
            { params: httpParams }
        );
    }

    getDiplomaById(id: string): Observable<GetDiplomaResponse> {
        console.log('[Diploma Debug] getDiplomaById request', {
            id,
            url: `${environment.apiBaseUrl}/diplomas/${id}`,
        });

        return this.http.get<GetDiplomaResponse>(
            `${environment.apiBaseUrl}/diplomas/${id}`
        );
    }
}
