import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { DashboardLayout } from './layout/dashboard/dashboard-layout/dashboard-layout';
import { userDashboardRoutes } from './features/user-dashboard/user-dashboard.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: authRoutes
  },
  {
    path: 'user-dashboard',
    loadChildren: () =>
      import('./features/user-dashboard/user-dashboard.routes')
        .then(m => m.userDashboardRoutes)
  },
];
