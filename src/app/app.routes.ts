import { Routes } from '@angular/router';
import {
  adminDashboardGuard,
  userDashboardGuard,
} from './core/guards/dashboard-access.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'user-dashboard',
    canMatch: [userDashboardGuard],
    loadChildren: () =>
      import('./features/user-dashboard/user-dashboard.routes').then(
        (m) => m.userDashboardRoutes
      ),
  },
  {
    path: 'admin-dashboard',
    canMatch: [adminDashboardGuard],
    loadChildren: () =>
      import('./features/admin-dashboard/admin-dashboard.routes').then(
        (m) => m.adminDashboardRoutes
      ),
  },
];
