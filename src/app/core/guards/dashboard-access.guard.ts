import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { UserRole } from '../../../../projects/auth/src/lib/enums/user-role';
import { authSession } from '../auth/auth-session';
import { AUTH_LOGIN_PATH, dashboardPathFor } from '../auth/role-redirect';

const dashboardRoleGuard = (requiredRole: UserRole): CanMatchFn => () => {
  const router = inject(Router);

  if (!authSession.isAuthenticated()) {
    return router.createUrlTree([AUTH_LOGIN_PATH]);
  }

  const role = authSession.getRole();
  if (role === requiredRole) {
    return true;
  }

  return router.createUrlTree([dashboardPathFor(role)]);
};

export const userDashboardGuard = dashboardRoleGuard(UserRole.USER);
export const adminDashboardGuard = dashboardRoleGuard(UserRole.ADMIN);
