import { Routes } from '@angular/router';
import { DashboardLayout } from '../../layout/dashboard/dashboard-layout/dashboard-layout';

export const userDashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardLayout,
    children: [
      {
        path: '',
        redirectTo: 'diplomas',
        pathMatch: 'full'
      },
      {
        path: 'diplomas',
        loadComponent: () =>
          import('./pages/diplomas/diplomas').then(m => m.Diplomas)
      },
      {
        path: 'diplomas/:diplomaId/exams',
        loadComponent: () =>
          import('./pages/exams/exams').then(m => m.Exams)
      },
      {
        path: 'diplomas/:diplomaId/exams/:examId/questions',
        loadComponent: () =>
          import('./pages/questions/questions').then(m => m.Questions)
      },
      {
        path: 'diplomas/:diplomaId/exams/:examId/questions/:questionId/answers',
        loadComponent: () =>
          import('./pages/answers/answers').then(m => m.Answers)
      },
      {
        path: 'account',
        loadComponent: () =>
          import('./pages/account/account').then(m => m.Account)
      },
      {
        path: 'change-password',
        loadComponent: () =>
          import('./pages/change-password/change-password').then(m => m.ChangePassword)
      }
    ]
  }
];