import { UserRole } from '../../../../projects/auth/src/lib/enums/user-role';
import { User } from '../../../../projects/auth/src/lib/models/responses/user.response';
import { AUTH_STORAGE_KEYS } from './auth-storage.keys';

export type AuthUser = Pick<
  User,
  'id' | 'firstName' | 'lastName' | 'email' | 'profilePhoto' | 'role'
>;

const isUserRole = (value: unknown): value is UserRole => {
  return value === UserRole.ADMIN || value === UserRole.USER;
};

const toAuthUser = (source: User | AuthUser): AuthUser => ({
  id: source.id,
  firstName: source.firstName,
  lastName: source.lastName,
  email: source.email,
  profilePhoto: source.profilePhoto,
  role: source.role,
});

const parseStoredUser = (raw: string | null): AuthUser | null => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<AuthUser>;
    if (!parsed?.email || !isUserRole(parsed.role)) return null;
    return parsed as AuthUser;
  } catch {
    return null;
  }
};

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
