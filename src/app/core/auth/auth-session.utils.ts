import { UserRole } from '../../../../projects/auth/src/lib/enums/user-role';
import type { User } from '../../../../projects/auth/src/lib/models/responses/user.response';
import type { AuthUser } from './auth-user.types';

export const isUserRole = (value: unknown): value is UserRole => {
  return value === UserRole.ADMIN || value === UserRole.USER;
};

export const toAuthUser = (source: User | AuthUser): AuthUser => ({
  id: source.id,
  firstName: source.firstName,
  lastName: source.lastName,
  email: source.email,
  profilePhoto: source.profilePhoto,
  role: source.role,
});

export const parseStoredUser = (raw: string | null): AuthUser | null => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<AuthUser>;
    if (!parsed?.email || !isUserRole(parsed.role)) return null;
    return parsed as AuthUser;
  } catch {
    return null;
  }
};
