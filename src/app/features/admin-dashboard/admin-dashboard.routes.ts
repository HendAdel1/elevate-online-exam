import { Routes } from '@angular/router';
import { AdminDashboardLayout } from './layout/admin-dashboard-layout/admin-dashboard-layout';

export const adminDashboardRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardLayout,
    children: [
      {
        path: '',
        redirectTo: 'diplomas',
        pathMatch: 'full'
      },
      {
        path: 'diplomas',
        data: {
          breadcrumb: 'Diplomas',
        },
        loadComponent: () =>
          import('../user-dashboard/pages/diplomas/diplomas').then(m => m.Diplomas)
      },
    ]
  }
];
