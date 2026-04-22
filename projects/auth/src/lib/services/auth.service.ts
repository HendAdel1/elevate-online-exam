import { Observable } from 'rxjs';
import { AuthAdapter } from '../adapters/auth.adapter';
import { SendEmailRequest } from '../models/requests/send-email.request';
import { LoginRequest } from '../models/requests/login.request';
import { RegisterRequest } from '../models/requests/register.request';
import { VerifyEmailRequest } from '../models/requests/verify-email.request';
import { ForgotPasswordRequest } from '../models/requests/forgot-password.request';
import { ResetPasswordRequest } from '../models/requests/reset-password.request';

type SendEmailResult = ReturnType<typeof AuthAdapter.adaptSendEmail>;
type LoginResult = ReturnType<typeof AuthAdapter.adaptLogin>;
type RegisterResult = ReturnType<typeof AuthAdapter.adaptRegister>;
type VerifyEmailResult = ReturnType<typeof AuthAdapter.adaptVerifyEmail>;
type ForgotPasswordResult = ReturnType<typeof AuthAdapter.adaptForgotPassword>;
type ResetPasswordResult = ReturnType<typeof AuthAdapter.adaptResetPassword>;

export abstract class AuthService {
  abstract sendEmail(data: SendEmailRequest): Observable<SendEmailResult>;
  abstract login(data: LoginRequest): Observable<LoginResult>;
  abstract register(data: RegisterRequest): Observable<RegisterResult>;
  abstract verifyEmail(data: VerifyEmailRequest): Observable<VerifyEmailResult>;
  abstract forgotPassword(data: ForgotPasswordRequest): Observable<ForgotPasswordResult>;
  abstract resetPassword(data: ResetPasswordRequest): Observable<ResetPasswordResult>;
}
