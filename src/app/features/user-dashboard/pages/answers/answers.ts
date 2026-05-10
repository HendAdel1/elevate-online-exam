import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FolderSearch,
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
  RefreshCw,
} from 'lucide-angular';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Diploma } from '../diplomas/models/diploma.interface';
import type { SubmissionAnalyticsItem } from '../submissions/models/submission-detail.models';
import type { Submission } from '../submissions/models/submission-core.model';
import { SubmissionsService } from '../submissions/services/submissions.service';

type AnswerBlock = { kind: 'wrong' | 'correctOutline'; text: string };

@Component({
  selector: 'app-answers',
  imports: [LucideAngularModule],
  templateUrl: './answers.html',
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ RefreshCw, FolderSearch }),
    },
  ],
})
export class Answers implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly submissionsService = inject(SubmissionsService);
  private readonly destroyRef = inject(DestroyRef);

  readonly isLoading = signal(true);
  readonly loadError = signal(false);
  readonly submission = signal<Submission | null>(null);
  readonly analytics = signal<SubmissionAnalyticsItem[]>([]);
  readonly diplomaId = signal('');
  private readonly diploma = signal<Diploma | null>(null);

  readonly examId =
    this.route.snapshot.paramMap.get('examId') ??
    this.route.snapshot.parent?.paramMap.get('examId') ??
    '';

  readonly headerLine = computed(() => {
    const d = this.diploma()?.title?.trim();
    const ex = this.submission()?.examTitle?.trim() ?? this.submission()?.exam?.title?.trim();
    if (d && ex) return `${d} - ${ex}`;
    return ex || d || 'Quiz results';
  });

  readonly totalQs = computed(() => Math.max(1, this.submission()?.totalQuestions ?? 1));

  readonly donutBackground = computed(() => {
    const s = this.submission();
    if (!s) return '';
    const t = Math.max(s.totalQuestions, s.correctAnswers + s.wrongAnswers, 1);
    const c = (s.correctAnswers / t) * 360;
    const w = (s.wrongAnswers / t) * 360;
    return `conic-gradient(from 90deg, #22c55e 0deg, #22c55e ${c}deg, #ef4444 ${c}deg, #ef4444 ${c + w}deg, #e5e7eb ${c + w}deg, #e5e7eb 360deg)`;
  });

  ngOnInit(): void {
    const examId = this.examId;
    if (!examId) {
      this.isLoading.set(false);
      this.loadError.set(true);
      return;
    }

    const ctx = this.resolveDiplomaFromRoute();
    this.diplomaId.set(ctx.diplomaId);
    this.diploma.set(ctx.diploma);

    const qid = this.route.snapshot.queryParamMap.get('submissionId') ?? '';
    const id$ = qid
      ? of(qid)
      : this.submissionsService
          .getSubmissions({ examId, limit: 1, page: 1 })
          .pipe(switchMap((res) => of(res.payload?.data?.[0]?.id ?? '')));

    id$
      .pipe(
        switchMap((id) => {
          if (!id) {
            this.loadError.set(true);
            this.isLoading.set(false);
            return of<void>(undefined);
          }
          return this.submissionsService.getSubmissionById(id);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (res) => {
          if (!res) return;
          this.submission.set(res.payload.submission);
          this.analytics.set(res.payload.analytics ?? []);
          this.isLoading.set(false);
        },
        error: () => {
          this.loadError.set(true);
          this.isLoading.set(false);
        },
      });
  }

  private resolveDiplomaFromRoute(): { diplomaId: string; diploma: Diploma | null } {
    let diplomaId = '';
    let diploma: Diploma | null = null;
    let r: ActivatedRoute | null = this.route;
    while (r) {
      if (!diplomaId) {
        const id = r.snapshot.paramMap.get('diplomaId');
        if (id) diplomaId = id;
      }
      if (!diploma) {
        const d = r.snapshot.data['diploma'] as Diploma | undefined;
        if (d) diploma = d;
      }
      r = r.parent;
    }
    return { diplomaId, diploma };
  }

  answerLabel(item: SubmissionAnalyticsItem): string {
    return item.selectedAnswer?.text?.trim() || 'No answer selected';
  }

  displayAnswerBlocks(item: SubmissionAnalyticsItem): AnswerBlock[] {
    if (item.answers?.length) {
      return this.blocksFromOptionList(item);
    }
    if (item.isCorrect) {
      return [{ kind: 'correctOutline', text: this.answerLabel(item) }];
    }
    const rows: AnswerBlock[] = [{ kind: 'wrong', text: this.answerLabel(item) }];
    const correct = this.correctAnswerLabel(item);
    if (correct) rows.push({ kind: 'correctOutline', text: correct });
    return rows;
  }

  private blocksFromOptionList(item: SubmissionAnalyticsItem): AnswerBlock[] {
    const opts = item.answers!;
    const out: AnswerBlock[] = [];
    const wrongPick = opts.find((x) => x.isSelected && !x.isCorrect);
    const rightPick = opts.find((x) => x.isSelected && x.isCorrect);
    const canonical = opts.find((x) => x.isCorrect);
    const wt = wrongPick?.text?.trim();
    if (wt) out.push({ kind: 'wrong', text: wt });
    if (!item.isCorrect) {
      const ct = canonical?.text?.trim() ?? '';
      if (ct) {
        const sameId =
          wrongPick?.id != null && canonical?.id != null && wrongPick.id === canonical.id;
        const sameText = wrongPick?.text?.trim() === ct;
        if (!sameId && !sameText) out.push({ kind: 'correctOutline', text: ct });
      }
    } else {
      const rt = rightPick?.text?.trim();
      if (rt) out.push({ kind: 'correctOutline', text: rt });
      else if (!out.length) out.push({ kind: 'correctOutline', text: this.answerLabel(item) });
    }
    return out;
  }

  correctAnswerLabel(item: SubmissionAnalyticsItem): string {
    return (
      item.correctAnswer?.text?.trim() ||
      item.answers?.find((a) => a.isCorrect)?.text?.trim() ||
      ''
    );
  }

  restart(): void {
    const d = this.diplomaId();
    const e = this.examId;
    if (d && e) {
      void this.router.navigate(['/user-dashboard', 'diplomas', d, 'exams', e, 'questions']);
    }
  }

  explore(): void {
    const d = this.diplomaId();
    void this.router.navigate(
      d ? ['/user-dashboard', 'diplomas', d, 'exams'] : ['/user-dashboard/diplomas'],
    );
  }
}
