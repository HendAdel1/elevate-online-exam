import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Diploma } from '../diplomas/models/diploma.interface';
import { Exam } from '../exams/models/exam.interface';
import { Question } from './models/question.interface';
import { SubmitExamAnswerItem } from './models/submission.interface';
import { QuestionsService } from './services/questions.service';
import { SubmissionsService } from './services/submissions.service';
import {
  ChevronLeft,
  ChevronRight,
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
  Send,
} from 'lucide-angular';

@Component({
  selector: 'app-questions',
  imports: [LucideAngularModule],
  templateUrl: './questions.html',
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ ChevronLeft, ChevronRight, Send }),
    },
  ],
})
export class Questions implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly questionsService = inject(QuestionsService);
  private readonly submissionsService = inject(SubmissionsService);
  private readonly destroyRef = inject(DestroyRef);

  readonly examId =
    this.route.snapshot.paramMap.get('examId') ??
    this.route.snapshot.parent?.paramMap.get('examId') ??
    '';

  readonly diplomaId =
    this.route.snapshot.parent?.paramMap.get('diplomaId') ?? '';

  private readonly diploma = signal<Diploma | null>(
    (this.route.snapshot.parent?.data['diploma'] as Diploma | undefined) ?? null
  );

  private readonly exam = signal<Exam | null>(
    (this.route.snapshot.data['exam'] as Exam | undefined) ?? null
  );

  readonly questions = signal<Question[]>([]);
  readonly isLoading = signal(true);
  readonly loadError = signal(false);
  readonly isSubmitting = signal(false);
  readonly submitError = signal(false);

  readonly currentIndex = signal(0);
  readonly selections = signal<Record<string, string>>({});

  /** ISO timestamp when the exam session started (for API). */
  private examStartedAt: string | null = null;

  readonly currentQuestion = computed(() => {
    const list = this.questions();
    const i = this.currentIndex();
    return list.length && i >= 0 && i < list.length ? list[i] : null;
  });

  readonly totalQuestions = computed(() => this.questions().length);

  readonly selectedAnswerForCurrent = computed(() => {
    const q = this.currentQuestion();
    if (!q) return undefined;
    return this.selections()[q.id];
  });

  readonly isFirstQuestion = computed(() => this.currentIndex() === 0);

  readonly isLastQuestion = computed(() => {
    const n = this.questions().length;
    return n === 0 || this.currentIndex() >= n - 1;
  });

  readonly allQuestionsAnswered = computed(() => {
    const list = this.questions();
    const sel = this.selections();
    if (!list.length) return false;
    return list.every((q) => !!sel[q.id]);
  });

  readonly canGoNext = computed(() => {
    const q = this.currentQuestion();
    if (!q || this.isLastQuestion()) return false;
    return !!this.selections()[q.id];
  });

  readonly canSubmit = computed(
    () => this.isLastQuestion() && this.allQuestionsAnswered() && !this.isSubmitting()
  );

  readonly progressPercent = computed(() => {
    const total = this.questions().length;
    if (!total) return 0;
    return ((this.currentIndex() + 1) / total) * 100;
  });

  readonly headerSubtitle = computed(() => {
    const d = this.diploma()?.title?.trim();
    const q0 = this.questions()[0];
    const e = this.exam()?.title?.trim() ?? q0?.exam?.title?.trim() ?? '';
    if (d && e) return `${d} - ${e}`;
    return e || d || 'Quiz';
  });

  readonly remainingSeconds = signal<number | null>(null);
  private readonly totalTimerSeconds = signal(0);
  private timerId: ReturnType<typeof setInterval> | null = null;

  readonly timerRingDegrees = computed(() => {
    const total = this.totalTimerSeconds();
    const rem = this.remainingSeconds();
    if (!total || rem === null || rem <= 0) return 0;
    return (rem / total) * 360;
  });

  readonly timerDonutBackground = computed(() => {
    const d = this.timerRingDegrees();
    return `conic-gradient(from 90deg, #2563eb 0deg, #2563eb ${d}deg, #dbeafe ${d}deg, #dbeafe 360deg)`;
  });

  constructor() {
    this.destroyRef.onDestroy(() => this.stopTimer());
  }

  ngOnInit(): void {
    if (!this.examId) {
      this.isLoading.set(false);
      this.loadError.set(true);
      return;
    }

    this.questionsService
      .getQuestionsForExam(this.examId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.questions.set(res.payload?.questions ?? []);
          this.isLoading.set(false);
          this.examStartedAt = new Date().toISOString();
          this.startTimer();
        },
        error: () => {
          this.isLoading.set(false);
          this.loadError.set(true);
        },
      });
  }

  private startTimer(): void {
    const minutes = this.exam()?.duration;
    if (minutes == null || minutes <= 0) return;

    const sec = Math.floor(minutes * 60);
    this.totalTimerSeconds.set(sec);
    this.remainingSeconds.set(sec);
    this.timerId = setInterval(() => {
      this.remainingSeconds.update((s) => {
        if (s == null || s <= 1) {
          this.stopTimer();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerId != null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  selectAnswer(answerId: string): void {
    const q = this.currentQuestion();
    if (!q) return;
    this.selections.update((m) => ({ ...m, [q.id]: answerId }));
  }

  goPrevious(): void {
    if (this.isFirstQuestion()) return;
    this.currentIndex.update((i) => Math.max(0, i - 1));
  }

  goNext(): void {
    if (!this.canGoNext()) return;
    this.currentIndex.update((i) =>
      Math.min(this.questions().length - 1, i + 1)
    );
  }

  submitExam(): void {
    if (!this.canSubmit()) return;

    const startedAt = this.examStartedAt ?? new Date().toISOString();
    const list = this.questions();
    const sel = this.selections();
    const answers: SubmitExamAnswerItem[] = list.map((q) => ({
      questionId: q.id,
      answerId: sel[q.id],
    }));

    this.isSubmitting.set(true);
    this.submitError.set(false);

    this.submissionsService
      .submitExam({ examId: this.examId, answers, startedAt })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.stopTimer();
          this.isSubmitting.set(false);
          const diploma = this.diplomaId;
          const questionId =
            this.currentQuestion()?.id ?? list[list.length - 1]?.id ?? '';
          if (diploma && questionId) {
            void this.router.navigate([
              '/user-dashboard',
              'diplomas',
              diploma,
              'exams',
              this.examId,
              'questions',
              questionId,
              'answers',
            ]);
          } else {
            void this.router.navigate(['/user-dashboard/diplomas']);
          }
        },
        error: () => {
          this.isSubmitting.set(false);
          this.submitError.set(true);
        },
      });
  }

  onNextOrSubmit(): void {
    if (this.isLastQuestion()) {
      this.submitExam();
    } else {
      this.goNext();
    }
  }

  formatTime(totalSec: number): string {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
}
