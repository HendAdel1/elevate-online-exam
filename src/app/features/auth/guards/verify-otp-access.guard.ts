import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

const VERIFY_EMAIL_STORAGE_KEY = 'auth_verify_email';

export const verifyOtpAccessGuard: CanActivateFn = () => {
  const router = inject(Router);
  const email = sessionStorage.getItem(VERIFY_EMAIL_STORAGE_KEY);

  if (email?.trim()) {
    return true;
  }

  return router.createUrlTree(['/auth/register/email'], {
    queryParams: { focus: 'email' },
  });
};
