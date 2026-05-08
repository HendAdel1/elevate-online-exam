import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthState } from '../auth/auth-state';
import { AUTH_LOGIN_PATH } from '../auth/role-redirect';

export const authenticatedGuard: CanMatchFn = () => {
  const router = inject(Router);
  const auth = inject(AuthState);

  if (auth.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree([AUTH_LOGIN_PATH]);
};
