import { Component, Input } from '@angular/core';
import { Sidenav } from '../components/sidenav/sidenav';
import { RouterOutlet } from '@angular/router';
import { DashboardHeader } from '../components/dashboard-header/dashboard-header';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { DashboardNavLink, DashboardTheme } from '../dashboard.types';

@Component({
  selector: 'app-dashboard-layout',
  imports: [Sidenav, Breadcrumb, DashboardHeader, RouterOutlet],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {
  @Input() theme: DashboardTheme = 'light';
  @Input() navLinks: DashboardNavLink[] = [
    { name: 'Diplomas', icon: 'graduation-cap', route: 'diplomas' },
    { name: 'Account Settings', icon: 'user-round', route: 'account-settings' }
  ];
}
