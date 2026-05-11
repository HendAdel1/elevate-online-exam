import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const FORGOT_PASSWORD_EMAIL_KEY = 'auth_forgot_password_email';

export const forgotPasswordAccessGuard: CanActivateFn = () => {
  const router = inject(Router);
  const email = sessionStorage.getItem(FORGOT_PASSWORD_EMAIL_KEY);

  if (email?.trim()) {
    return true;
  }

  return router.createUrlTree(['/auth/forgot-password']);
};
