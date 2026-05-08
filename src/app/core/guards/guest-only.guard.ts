import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { authSession } from '../auth/auth-session';
import { dashboardPathFor } from '../auth/role-redirect';

export const guestOnlyGuard: CanMatchFn = () => {
  const router = inject(Router);

  if (!authSession.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree([dashboardPathFor(authSession.getRole())]);
};
