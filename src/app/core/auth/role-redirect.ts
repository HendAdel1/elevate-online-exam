import { UserRole } from '../../../../projects/auth/src/lib/enums/user-role';

export const AUTH_LOGIN_PATH = '/auth/login';
export const USER_DASHBOARD_PATH = '/user-dashboard';
export const ADMIN_DASHBOARD_PATH = '/admin-dashboard';

export const dashboardPathFor = (role: UserRole | null): string => {
  if (role === UserRole.ADMIN) return ADMIN_DASHBOARD_PATH;
  if (role === UserRole.USER) return USER_DASHBOARD_PATH;
  return AUTH_LOGIN_PATH;
};
