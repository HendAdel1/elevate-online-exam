import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { DashboardLayout } from './layout/dashboard/dashboard-layout/dashboard-layout';

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
    component: DashboardLayout
  }
];
