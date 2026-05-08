import { Routes } from '@angular/router';
import { UserDashboardLayout } from './layout/user-dashboard-layout/user-dashboard-layout/user-dashboard-layout';

export const userDashboardRoutes: Routes = [
  {
    path: '',
    component: UserDashboardLayout,
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
          header: { icon: 'graduation-cap', label: 'Diplomas', showBack: false}
         },
        loadComponent: () =>
          import('./pages/diplomas/diplomas').then(m => m.Diplomas)
      },
      {
        path: 'diplomas/:diplomaId/exams',
        data: { 
          breadcrumb: 'Exams',
          header: { icon: 'book-open-check', type: 'diplomaExams', showBack: true}
         },
        loadComponent: () =>
          import('./pages/exams/exams').then(m => m.Exams)
      },
      {
        path: 'diplomas/:diplomaId/exams/:examId/questions',
        data: { 
          breadcrumb: 'Questions',
          header: { icon: 'circle-question-mark', type: 'examQuestions', showBack: true}
         },
        loadComponent: () =>
          import('./pages/questions/questions').then(m => m.Questions)
      },
      {
        path: 'diplomas/:diplomaId/exams/:examId/questions/:questionId/answers',
        data: { 
          breadcrumb: 'Answers',
          header: { icon: 'message-circle', type: 'answers', showBack: true}
         },
        loadComponent: () =>
          import('./pages/answers/answers').then(m => m.Answers)
      },
      {
        path: 'account-settings',
        data: { 
          breadcrumb: 'Account',
          header: { icon: 'user-round', label: 'Account Settings', showBack: true}
         },
        loadComponent: () =>
          import('./pages/account/account').then(m => m.Account)
      },
      {
        path: 'change-password',
        data: { 
          breadcrumb: 'Change Password',
          header: { icon: 'key-round', label: 'Account Settings', showBack: true}
         },
        loadComponent: () =>
          import('./pages/change-password/change-password').then(m => m.ChangePassword)
      }
    ]
  }
];