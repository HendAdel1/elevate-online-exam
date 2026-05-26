import { UserRole } from '../../../../projects/auth/src/lib/enums/user-role';
import type { User } from '../../../../projects/auth/src/lib/models/responses/user.response';
import { AUTH_STORAGE_KEYS } from './auth-storage.keys';
import type { AuthUser } from './auth-user.types';
import { isUserRole, parseStoredUser, toAuthUser } from './auth-session.utils';

export type { AuthUser } from './auth-user.types';

export const authSession = {
  getToken(): string | null {
    return sessionStorage.getItem(AUTH_STORAGE_KEYS.token);
  },

  getRole(): UserRole | null {
    const role = sessionStorage.getItem(AUTH_STORAGE_KEYS.role);
    return isUserRole(role) ? role : null;
  },

  getUser(): AuthUser | null {
    return parseStoredUser(sessionStorage.getItem(AUTH_STORAGE_KEYS.user));
  },

  isAuthenticated(): boolean {
    return !!this.getToken()?.trim() && this.getRole() !== null;
  },

  setSession(token: string, user: User | AuthUser): void {
    const authUser = toAuthUser(user);
    sessionStorage.setItem(AUTH_STORAGE_KEYS.token, token);
    sessionStorage.setItem(AUTH_STORAGE_KEYS.role, authUser.role);
    sessionStorage.setItem(AUTH_STORAGE_KEYS.user, JSON.stringify(authUser));
  },

  clear(): void {
    sessionStorage.removeItem(AUTH_STORAGE_KEYS.token);
    sessionStorage.removeItem(AUTH_STORAGE_KEYS.role);
    sessionStorage.removeItem(AUTH_STORAGE_KEYS.user);
  },
};
