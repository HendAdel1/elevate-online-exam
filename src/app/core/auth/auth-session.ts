import { UserRole } from '../../../../projects/auth/src/lib/enums/user-role';
import { AUTH_STORAGE_KEYS } from './auth-storage.keys';

const isUserRole = (value: string | null): value is UserRole => {
  return value === UserRole.ADMIN || value === UserRole.USER;
};

export const authSession = {
  getToken(): string | null {
    return sessionStorage.getItem(AUTH_STORAGE_KEYS.token);
  },

  getRole(): UserRole | null {
    const role = sessionStorage.getItem(AUTH_STORAGE_KEYS.role);
    return isUserRole(role) ? role : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken()?.trim() && this.getRole() !== null;
  },

  setSession(token: string, role: UserRole): void {
    sessionStorage.setItem(AUTH_STORAGE_KEYS.token, token);
    sessionStorage.setItem(AUTH_STORAGE_KEYS.role, role);
  },

  clear(): void {
    sessionStorage.removeItem(AUTH_STORAGE_KEYS.token);
    sessionStorage.removeItem(AUTH_STORAGE_KEYS.role);
  },
};
