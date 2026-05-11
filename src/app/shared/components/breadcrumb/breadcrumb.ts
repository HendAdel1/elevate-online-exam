import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
export interface BreadcrumbItem {
  label: string;
  url: string;
  clickable?: boolean;
}
@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class Breadcrumb implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  breadcrumbs: BreadcrumbItem[] = [];

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumb(this.activatedRoute.root);
      });

    this.breadcrumbs = this.buildBreadcrumb(this.activatedRoute.root);
  }

  private buildBreadcrumb(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbItem[] = []): BreadcrumbItem[] {
    const children = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL = child.snapshot.url.map(segment => segment.path).join('/');

      if (routeURL) {
        url += `/${routeURL}`;
      }

      const crumbItems = child.snapshot.data['breadcrumbItems'] as BreadcrumbItem[] | undefined;
      if (crumbItems?.length) {
        for (const it of crumbItems) {
          this.addBreadcrumb(breadcrumbs, {
            ...it,
            url: it.url || url,
          });
        }
        return this.buildBreadcrumb(child, url, breadcrumbs);
      }

      const label = child.snapshot.data['breadcrumb'];
      const resolved = child.snapshot.data;

      if (label === ':diploma' && resolved['diploma']?.title) {
        this.addBreadcrumb(breadcrumbs, {
          label: resolved['diploma'].title,
          url,
          clickable: false,
        });
      } else if (label === ':exam' && resolved['exam']?.title) {
        this.addBreadcrumb(breadcrumbs, {
          label: resolved['exam'].title,
          url,
        });
      } else if (label === ':diplomaAnswers') {
        const diplomaTitle = this.getDiplomaTitleFromRoute(child);
        this.addBreadcrumb(breadcrumbs, {
          label: diplomaTitle ? `${diplomaTitle} Answers` : 'Answers',
          url,
          clickable: false,
        });
      } else if (
        label &&
        label !== ':diploma' &&
        label !== ':exam' &&
        label !== ':diplomaAnswers'
      ) {
        this.addBreadcrumb(breadcrumbs, { label, url });
      }

      return this.buildBreadcrumb(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  private getDiplomaTitleFromRoute(route: ActivatedRoute): string | undefined {
    let r: ActivatedRoute | null = route;
    while (r) {
      const d = r.snapshot.data['diploma'] as { title?: string } | undefined;
      if (d?.title?.trim()) return d.title.trim();
      r = r.parent;
    }
    return undefined;
  }

  private addBreadcrumb(
    breadcrumbs: BreadcrumbItem[],
    item: BreadcrumbItem
  ): void {
    const last = breadcrumbs[breadcrumbs.length - 1];
    if (last?.label === item.label && last.url === item.url) return;
    breadcrumbs.push(item);
  }
}