import { Component } from '@angular/core';
import { DashboardLayout } from '../../../../../layout/dashboard/dashboard-layout/dashboard-layout';
import { DashboardNavLink } from '../../../../../layout/dashboard/dashboard.types';

@Component({
  selector: 'app-user-dashboard-layout',
  imports: [DashboardLayout],
  templateUrl: './user-dashboard-layout.html',
  styleUrl: './user-dashboard-layout.css',
})
export class UserDashboardLayout {
  navLinks: DashboardNavLink[] = [
    { name: 'Diplomas', icon: 'graduation-cap', route: 'diplomas' },
    { name: 'Account Settings', icon: 'user-round', route: 'account-settings' }
  ];
}
