import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getBoolean } from '../utils/storage.util';
import {
  CREATE_PASSWORD_ACCESS_STORAGE_KEY,
  USER_INFO_ACCESS_STORAGE_KEY,
  VERIFY_EMAIL_STORAGE_KEY,
} from '../constants/registration-session.keys';

export const createPasswordAccessGuard: CanActivateFn = () => {
  const router = inject(Router);
  const hasCreatePasswordAccess = getBoolean(CREATE_PASSWORD_ACCESS_STORAGE_KEY);

  if (hasCreatePasswordAccess) {
    return true;
  }

  const hasUserInfoAccess = getBoolean(USER_INFO_ACCESS_STORAGE_KEY);
  if (hasUserInfoAccess) {
    return router.createUrlTree(['/auth/register/user-info']);
  }

  const storedEmail = sessionStorage.getItem(VERIFY_EMAIL_STORAGE_KEY);
  if (storedEmail?.trim()) {
    return router.createUrlTree(['/auth/register/verify-otp']);
  }

  return router.createUrlTree(['/auth/register/email'], {
    queryParams: { focus: 'email' },
  });
};
