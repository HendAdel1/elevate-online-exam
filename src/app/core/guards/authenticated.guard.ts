import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { authSession } from '../auth/auth-session';
import { AUTH_LOGIN_PATH } from '../auth/role-redirect';

export const authenticatedGuard: CanMatchFn = () => {
  const router = inject(Router);

  if (authSession.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree([AUTH_LOGIN_PATH]);
};
