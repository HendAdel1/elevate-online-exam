import { Routes } from '@angular/router';
import { AuthLayout } from "../../layout/auth/auth-layout/auth-layout";

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register').then((m) => m.Register),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./pages/forgot-password/forgot-password').then((m) => m.ForgotPassword),
      },
      {
        path: 'verify-otp',
        loadComponent: () =>
          import('./pages/verify-otp/verify-otp').then((m) => m.VerifyOtp),
      },
      {
        path: 'verify-email',
        loadComponent: () =>
          import('./pages/verify-email/verify-email').then((m) => m.VerifyEmail),
      },
      {
        path: 'create-password',
        loadComponent: () =>
          import('./pages/create-password/create-password').then((m) => m.CreatePassword),
      },
    ]
  },
];
