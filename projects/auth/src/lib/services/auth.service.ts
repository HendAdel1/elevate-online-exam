import { Observable } from 'rxjs';
import type {
  ForgotPasswordResult,
  LoginResultType,
  RegisterResult,
  ResetPasswordResult,
  SendEmailResult,
  VerifyEmailResult,
} from '../models/auth-service-results.types';
import { SendEmailRequest } from '../models/requests/send-email.request';
import { LoginRequest } from '../models/requests/login.request';
import { RegisterRequest } from '../models/requests/register.request';
import { VerifyEmailRequest } from '../models/requests/verify-email.request';
import { ForgotPasswordRequest } from '../models/requests/forgot-password.request';
import { ResetPasswordRequest } from '../models/requests/reset-password.request';

export abstract class AuthService {
  abstract sendEmail(data: SendEmailRequest): Observable<SendEmailResult>;
  abstract login(data: LoginRequest): Observable<LoginResultType>;
  abstract register(data: RegisterRequest): Observable<RegisterResult>;
  abstract verifyEmail(data: VerifyEmailRequest): Observable<VerifyEmailResult>;
  abstract forgotPassword(data: ForgotPasswordRequest): Observable<ForgotPasswordResult>;
  abstract resetPassword(data: ResetPasswordRequest): Observable<ResetPasswordResult>;
}
