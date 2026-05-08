import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthState } from '../auth/auth-state';
import { dashboardPathFor } from '../auth/role-redirect';

export const guestOnlyGuard: CanMatchFn = () => {
  const router = inject(Router);
  const auth = inject(AuthState);

  if (!auth.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree([dashboardPathFor(auth.role())]);
};
