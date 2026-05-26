import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  ChevronDown,
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
} from 'lucide-angular';
import { DiplomasService } from './services/diplomas.service';
import { Diploma } from './models/diploma.interface';

@Component({
  selector: 'app-diplomas',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './diplomas.html',
  styleUrl: './diplomas.css',
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ ChevronDown }),
    },
  ],
})
export class Diplomas implements OnInit, AfterViewInit, OnDestroy {
  private readonly diplomasService = inject(DiplomasService);
  private readonly destroyRef = inject(DestroyRef);

  readonly diplomas = signal<Diploma[]>([]);
  readonly isLoading = signal(false);
  readonly hasMore = signal(true);

  readonly sentinel = viewChild<ElementRef<HTMLElement>>('sentinel');

  private currentPage = 1;
  private totalPages = 1;
  private readonly pageSize = 6;
  private readonly cooldownMs = 600;
  private lastLoadAt = 0;
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    this.loadDiplomas();
  }

  ngAfterViewInit(): void {
    const target = this.sentinel()?.nativeElement;
    if (!target) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.loadDiplomas();
        }
      },
      { rootMargin: '0px', threshold: 0.1 }
    );

    this.observer.observe(target);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  loadDiplomas(): void {
    if (this.isLoading() || !this.hasMore()) {
      return;
    }

    const now = Date.now();
    const elapsed = now - this.lastLoadAt;
    if (elapsed < this.cooldownMs) {
      setTimeout(() => this.loadDiplomas(), this.cooldownMs - elapsed);
      return;
    }
    this.lastLoadAt = now;

    this.isLoading.set(true);

    this.diplomasService
      .getDiplomas({ page: this.currentPage, limit: this.pageSize })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.diplomas.update((current) => [
            ...current,
            ...response.payload.data,
          ]);
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
