import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GraduationCap, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, UserRound } from 'lucide-angular';
import { DashboardNavLink } from '../../../../dashboard.types';

@Component({
  selector: 'app-sidenav-nav-links',
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './sidenav-nav-links.html',
  styleUrl: './sidenav-nav-links.css',
   providers:[{
        provide: LUCIDE_ICONS,
        multi: true,
        useValue: new LucideIconProvider({GraduationCap, UserRound}),
      }]
})
export class SidenavNavLinks {
  @Input() links: DashboardNavLink[] = [
    { name: 'Diplomas', icon: 'graduation-cap', route: 'diplomas' },
    { name: 'Account Settings', icon: 'user-round', route: 'account-settings' }
  ];
}
