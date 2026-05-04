import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BookOpenCheck, ChevronLeft, CircleQuestionMark, GraduationCap, KeyRound, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, MessageCircle, UserRound } from 'lucide-angular';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard-header',
  imports: [LucideAngularModule],
  templateUrl: './dashboard-header.html',
  styleUrl: './dashboard-header.css',
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ GraduationCap, BookOpenCheck, CircleQuestionMark, MessageCircle, UserRound, KeyRound, ChevronLeft }),
  }]
})
export class DashboardHeader implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  title = '';
  icon = '';
  showBack = false;

  ngOnInit() {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.updateHeader());

    this.updateHeader();
  }

  private getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  private updateHeader() {
    const current = this.getDeepestRoute(this.route);
    const data = current.snapshot.data['header'];
    const params = current.snapshot.params;

    if (!data) {
      this.reset();
      return;
    }

    this.icon = data.icon;
    this.showBack = data.showBack ?? false;
    this.title = this.getTitle(data, params);
  }

  private reset() {
    this.title = '';
    this.icon = '';
    this.showBack = false;
  }

  private getTitle(data: any, params: any): string {
    if (data.type === 'diplomaExams') {
      return `Diploma ${params['diplomaId']} Exams`;
    }

    if (data.type === 'examQuestions') {
      return `Exam ${params['examId']} Questions`;
    }

    if (data.type === 'answers') {
      return 'Answers';
    }

    return data.label || '';
  }
}