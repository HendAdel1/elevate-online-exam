import type { User } from '../../../../projects/auth/src/lib/models/responses/user.response';

export type AuthUser = Pick<
  User,
  'id' | 'firstName' | 'lastName' | 'email' | 'profilePhoto' | 'role'
>;
