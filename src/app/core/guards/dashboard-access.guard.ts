import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { UserRole } from '../../../../projects/auth/src/lib/enums/user-role';
import { AuthState } from '../auth/auth-state';
import { AUTH_LOGIN_PATH, dashboardPathFor } from '../auth/role-redirect';

const dashboardRoleGuard = (requiredRole: UserRole): CanMatchFn => () => {
  const router = inject(Router);
  const auth = inject(AuthState);

  if (!auth.isAuthenticated()) {
    return router.createUrlTree([AUTH_LOGIN_PATH]);
  }

  if (auth.hasRole(requiredRole)) {
    return true;
  }

  return router.createUrlTree([dashboardPathFor(auth.role())]);
};

export const userDashboardGuard = dashboardRoleGuard(UserRole.USER);
export const adminDashboardGuard = dashboardRoleGuard(UserRole.ADMIN);
