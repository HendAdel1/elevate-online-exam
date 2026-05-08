import { Component } from '@angular/core';
import { DashboardLayout } from '../../../../layout/dashboard/dashboard-layout/dashboard-layout';
import { DashboardNavLink } from '../../../../layout/dashboard/dashboard.types';

@Component({
  selector: 'app-admin-dashboard-layout',
  imports: [DashboardLayout],
  templateUrl: './admin-dashboard-layout.html',
  styleUrl: './admin-dashboard-layout.css',
})
export class AdminDashboardLayout {
  navLinks: DashboardNavLink[] = [
    { name: 'Diplomas', icon: 'graduation-cap', route: 'diplomas' },
    { name: 'Exams', icon: 'book-open-check', route: 'exams' },
    { name: 'Account Settings', icon: 'user-round', route: 'account-settings' },
    { name: 'Audit Log', icon: 'logs', route: '' }
  ];
}
