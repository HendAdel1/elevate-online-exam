import type { User } from '../../../../../../../projects/auth/src/lib/models/responses/user.response';

export type AccountUser = User;

export interface PatchProfileRequestBody {
  firstName: string;
  lastName: string;
  profilePhoto: string;
  phone: string;
}

export interface PatchProfileResponseBody {
  message?: string;
  user: AccountUser;
}

export interface EmailChangeRequestBody {
  newEmail: string;
}

export interface EmailChangeRequestResponse {
  message?: string;
  code?: string;
}

export interface EmailConfirmBody {
  code: string;
}

export interface EmailConfirmResponseBody {
  message?: string;
  user: AccountUser;
}

export interface ChangePasswordRequestBody {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponseBody {
  message?: string;
}
