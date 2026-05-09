import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { Exam, GetExamResponse } from '../models/exam.interface';
import { ExamsService } from '../services/exams.service';

const extractExam = (res: GetExamResponse): Exam | null => {
  if (res.exam) return res.exam;
  if (!res.payload) return null;
  if ('id' in res.payload) return res.payload as Exam;
  const nested = res.payload as { data?: Exam; exam?: Exam };
  return nested.data ?? nested.exam ?? null;
};

export const examResolver: ResolveFn<Exam | null> = (
  route
): Observable<Exam | null> => {
  const id =
    route.paramMap.get('examId') ??
    route.parent?.paramMap.get('examId') ??
    null;

  if (!id) return of(null);

  return inject(ExamsService).getExamById(id).pipe(map(extractExam));
};
