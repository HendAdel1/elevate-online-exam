import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getBoolean } from '../utils/storage.util';
import {
  USER_INFO_ACCESS_STORAGE_KEY,
  VERIFY_EMAIL_STORAGE_KEY,
} from '../constants/registration-session.keys';

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
