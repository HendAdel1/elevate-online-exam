import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, map, of, tap } from 'rxjs';
import { Diploma, GetDiplomaResponse } from '../models/diploma.interface';
import { DiplomasService } from '../services/diplomas.service';

const extractDiploma = (res: GetDiplomaResponse): Diploma | null => {
  if (res.diploma) return res.diploma;
  if (!res.payload) return null;
  if ('id' in res.payload) return res.payload;
  return res.payload.data ?? res.payload.diploma ?? null;
};

export const diplomaResolver: ResolveFn<Diploma | null> = (
  route
): Observable<Diploma | null> => {
  const id =
    route.paramMap.get('diplomaId') ??
    route.parent?.paramMap.get('diplomaId') ??
    null;

  console.log('[Diploma Debug] resolver params', {
    id,
    routeParams: route.params,
    parentParams: route.parent?.params,
  });

  if (!id) return of(null);

  return inject(DiplomasService)
    .getDiplomaById(id)
    .pipe(
      tap((res) => {
        console.log('[Diploma Debug] resolver API response', res);
      }),
      map((res) => {
        const diploma = extractDiploma(res);
        console.log('[Diploma Debug] resolver mapped diploma', diploma);
        return diploma;
      })
    );
};
