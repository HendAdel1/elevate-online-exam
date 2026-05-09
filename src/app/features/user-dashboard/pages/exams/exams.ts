import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CircleHelp, Clock, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, MoveRight } from 'lucide-angular';
import { ExamsService } from './services/exams.service';
import { Exam } from './models/exam.interface';
import { OverflowDirective } from '../../../../shared/directives/overflow.directive';

@Component({
  selector: 'app-exams',
  imports: [RouterLink, LucideAngularModule, OverflowDirective],
  templateUrl: './exams.html',
  styleUrl: './exams.css',
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ CircleHelp, Clock, MoveRight }),
    },
  ],
})
export class Exams implements OnInit, AfterViewInit, OnDestroy {
  private readonly examsService = inject(ExamsService);
  private readonly route = inject(ActivatedRoute);

  readonly exams = signal<Exam[]>([]);
  readonly isLoading = signal(false);
  readonly hasMore = signal(true);

  readonly sentinel = viewChild<ElementRef<HTMLElement>>('sentinel');

  diplomaId = '';
  private currentPage = 1;
  private totalPages = 1;
  private readonly pageSize = 6;
  private readonly cooldownMs = 600;
  private lastLoadAt = 0;
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    this.diplomaId =
      this.route.snapshot.paramMap.get('diplomaId') ??
      this.route.parent?.snapshot.paramMap.get('diplomaId') ??
      '';
    this.loadExams();
  }

  ngAfterViewInit(): void {
    const target = this.sentinel()?.nativeElement;
    if (!target) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.loadExams();
        }
      },
      { rootMargin: '0px', threshold: 0.1 },
    );

    this.observer.observe(target);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  loadExams(): void {
    if (this.isLoading() || !this.hasMore()) {
      return;
    }

    const now = Date.now();
    const elapsed = now - this.lastLoadAt;
    if (elapsed < this.cooldownMs) {
      setTimeout(() => this.loadExams(), this.cooldownMs - elapsed);
      return;
    }
    this.lastLoadAt = now;

    this.isLoading.set(true);

    this.examsService
      .getExams({
        diplomaId: this.diplomaId,
        page: this.currentPage,
        limit: this.pageSize,
      })
      .subscribe({
        next: (response) => {
          this.exams.update((current) => [...current, ...response.payload.data]);
          this.totalPages = response.payload.metadata.totalPages;
          this.currentPage++;
          this.hasMore.set(this.currentPage <= this.totalPages);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
  }
}
