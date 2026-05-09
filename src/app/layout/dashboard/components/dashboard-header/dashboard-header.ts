import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import {
  BookOpenCheck,
  ChevronLeft,
  CircleQuestionMark,
  GraduationCap,
  KeyRound,
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
  MessageCircle,
  UserRound,
} from 'lucide-angular';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard-header',
  imports: [LucideAngularModule],
  templateUrl: './dashboard-header.html',
  styleUrl: './dashboard-header.css',
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({
        GraduationCap,
        BookOpenCheck,
        CircleQuestionMark,
        MessageCircle,
        UserRound,
        KeyRound,
        ChevronLeft,
      }),
    },
  ],
})
export class DashboardHeader implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private destroyRef = inject(DestroyRef);

  title = '';
  icon = '';
  showBack = false;

  private internalNavigationCount = 0;

  ngOnInit() {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.internalNavigationCount++;
        this.updateHeader();
      });

    this.updateHeader();
  }

  goBack() {
    if (this.internalNavigationCount > 1) {
      this.location.back();
      return;
    }

    const fallback = this.getParentUrl();
    this.router.navigateByUrl(fallback);
  }

  private getParentUrl(): string {
    const path = this.router.url.split(/[?#]/, 1)[0];
    const parts = path.split('/').filter(Boolean);
    if (parts.length <= 1) {
      return '/';
    }

    const last = parts[parts.length - 1];
    if (last === 'answers') {
      parts.pop();
      parts.pop();
      return '/' + parts.join('/');
    }
    if (last === 'questions') {
      parts.pop();
      parts.pop();
      return '/' + parts.join('/');
    }
    if (last === 'exams' && parts.length >= 3 && parts[parts.length - 3] === 'diplomas') {
      parts.pop();
      parts.pop();
      return '/' + parts.join('/');
    }

    parts.pop();
    return '/' + parts.join('/');
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

    if (!data) {
      this.reset();
      return;
    }

    this.icon = data.icon;
    this.showBack = data.showBack ?? false;
    this.title = this.getTitle(data);
  }

  private reset() {
    this.title = '';
    this.icon = '';
    this.showBack = false;
  }

  private getTitle(data: any): string {
    const current = this.getDeepestRoute(this.route);
    const diploma = this.findResolved(current, 'diploma');

    if (data.type === 'diplomaExams') {
      return diploma?.title ? `${diploma.title} Exams` : 'Exams';
    }

    if (data.type === 'examQuestions') {
      const exam = this.findResolved(current, 'exam');
      return exam?.title ? `${exam.title} Questions` : 'Questions';
    }

    if (data.type === 'answers') {
      const diploma = this.findResolved(current, 'diploma');
      return diploma?.title ? `${diploma.title} Answers` : 'Answers';
    }

    return data.label || '';
  }

  private findResolved(route: ActivatedRoute, key: string): any {
    let r: ActivatedRoute | null = route;
    while (r) {
      const value = r.snapshot.data[key];
      if (value) return value;
      r = r.parent;
    }
    return null;
  }
}
