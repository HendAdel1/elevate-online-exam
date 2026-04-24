import { Routes } from '@angular/router';
import { AuthLayout } from "../../layout/auth/auth-layout/auth-layout";
import { userInfoAccessGuard } from './guards/user-info-access.guard';
import { verifyOtpAccessGuard } from './guards/verify-otp-access.guard';

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
          import('./pages/registeration/register/register').then((m) => m.Register),
        children: [
          { path: '', redirectTo: 'email', pathMatch: 'full'},
          {
            path: 'email',
            loadComponent: () =>
              import('./pages/registeration/steps/email/email').then((m) => m.Email)
          },
          {
            path: 'verify-otp',
            canActivate: [verifyOtpAccessGuard],
            loadComponent: () =>
              import('./pages/registeration/steps/verify-otp/verify-otp').then((m) => m.VerifyOtp),
          },
          {
            path: 'user-info',
            canActivate: [userInfoAccessGuard],
            loadComponent: () =>
              import('./pages/registeration/steps/user-info/user-info').then((m) => m.UserInfo),
          },
          {
            path: 'create-password',
            loadComponent: () =>
              import('./pages/registeration/steps/create-password/create-password').then((m) => m.CreatePassword),
          },
        ]
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./pages/forgot-password/forgot-password').then((m) => m.ForgotPassword),
      },
      {
        path: 'verify-email',
        loadComponent: () =>
          import('./pages/verify-email/verify-email').then((m) => m.VerifyEmail),
      },
      {
        path: 'create-new-password',
        loadComponent: () =>
          import('./pages/create-new-password/create-new-password').then((m) => m.CreateNewPassword),
      },
    ]
  },
];
