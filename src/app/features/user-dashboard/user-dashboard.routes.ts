import { Routes } from '@angular/router';
import { UserDashboardLayout } from './layout/user-dashboard-layout/user-dashboard-layout/user-dashboard-layout';
import { diplomaResolver } from './pages/diplomas/resolvers/diploma.resolver';
import { examResolver } from './pages/exams/resolvers/exam.resolver';

export const userDashboardRoutes: Routes = [
  {
    path: '',
    component: UserDashboardLayout,
    children: [
      {
        path: '',
        redirectTo: 'diplomas',
        pathMatch: 'full',
      },
      {
        path: 'diplomas',
        data: {
          breadcrumb: 'Diplomas',
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            data: {
              header: {
                icon: 'graduation-cap',
                label: 'Diplomas',
                showBack: false,
              },
            },
            loadComponent: () =>
              import('./pages/diplomas/diplomas').then((m) => m.Diplomas),
          },
          {
            path: ':diplomaId',
            resolve: { diploma: diplomaResolver },
            data: { breadcrumb: ':diploma' },
            children: [
              {
                path: 'exams/:examId/questions/:questionId/answers',
                data: {
                  breadcrumb: ':diplomaAnswers',
                  header: {
                    icon: 'circle-question-mark',
                    type: 'answers',
                    showBack: true,
                  },
                },
                loadComponent: () =>
                  import('./pages/answers/answers').then((m) => m.Answers),
              },
              {
                path: 'exams/:examId/questions/:questionId',
                redirectTo: 'exams/:examId/questions',
                pathMatch: 'full',
              },
              {
                path: 'exams/:examId/questions',
                resolve: { exam: examResolver },
                data: {
                  breadcrumb: ':exam',
                  header: {
                    icon: 'circle-question-mark',
                    type: 'examQuestions',
                    showBack: true,
                  },
                },
                loadComponent: () =>
                  import('./pages/questions/questions').then((m) => m.Questions),
              },
              {
                path: 'exams/:examId',
                redirectTo: 'exams',
                pathMatch: 'full',
              },
              {
                path: 'exams',
                data: {
                  breadcrumb: 'Exams',
                  header: {
                    icon: 'book-open-check',
                    type: 'diplomaExams',
                    showBack: true,
                  },
                },
                loadComponent: () =>
                  import('./pages/exams/exams').then((m) => m.Exams),
              },
            ],
          },
        ],
      },
      {
        path: 'account-settings',
        data: {
          breadcrumb: 'Account',
          header: { icon: 'user-round', label: 'Account Settings', showBack: true },
        },
        loadComponent: () =>
          import('./pages/account/account').then((m) => m.Account),
      },
      {
        path: 'change-password',
        data: {
          breadcrumb: 'Change Password',
          header: { icon: 'key-round', label: 'Account Settings', showBack: true },
        },
        loadComponent: () =>
          import('./pages/change-password/change-password').then(
            (m) => m.ChangePassword
          ),
      },
    ],
  },
];
