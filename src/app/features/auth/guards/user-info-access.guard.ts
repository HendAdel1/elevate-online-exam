import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getBoolean } from '../utils/storage.util';

const VERIFY_EMAIL_STORAGE_KEY = 'auth_verify_email';
const USER_INFO_ACCESS_STORAGE_KEY = 'auth_user_info_access';

export const userInfoAccessGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isVerified = getBoolean(USER_INFO_ACCESS_STORAGE_KEY);

  if (isVerified) {
    return true;
  }

  const storedEmail = sessionStorage.getItem(VERIFY_EMAIL_STORAGE_KEY);

  if (storedEmail?.trim()) {
    return router.createUrlTree(['/auth/register/verify-otp']);
  }

  return router.createUrlTree(['/auth/register/email'], {
    queryParams: { focus: 'email' },
  });
};
