import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { FORGOT_PASSWORD_EMAIL_KEY } from './forgot-password-access.guard';

export const createNewPasswordAccessGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  
  // Allow if reset token is present in URL (from email link)
  const token = route.queryParamMap.get('token');
  if (token?.trim()) {
    return true;
  }

  // Allow if coming from forgot password flow
  const email = sessionStorage.getItem(FORGOT_PASSWORD_EMAIL_KEY);
  if (email?.trim()) {
    return true;
  }

  return router.createUrlTree(['/auth/forgot-password']);
};
