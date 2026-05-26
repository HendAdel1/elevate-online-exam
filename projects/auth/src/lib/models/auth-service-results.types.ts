import type { AuthAdapter } from '../adapters/auth.adapter';
import type { LoginResult } from './responses/login-result.response';

export type SendEmailResult = ReturnType<typeof AuthAdapter.adaptSendEmail>;
export type LoginResultType = LoginResult;
export type RegisterResult = ReturnType<typeof AuthAdapter.adaptRegister>;
export type VerifyEmailResult = ReturnType<typeof AuthAdapter.adaptVerifyEmail>;
export type ForgotPasswordResult = ReturnType<typeof AuthAdapter.adaptForgotPassword>;
export type ResetPasswordResult = ReturnType<typeof AuthAdapter.adaptResetPassword>;
