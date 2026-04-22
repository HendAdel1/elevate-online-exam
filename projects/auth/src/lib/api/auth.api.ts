import { Observable } from 'rxjs';
import { SendEmailRequest } from '../models/requests/send-email.request';
import { RegisterRequest } from '../models/requests/register.request';
import { LoginRequest } from '../models/requests/login.request';
import { VerifyEmailRequest } from '../models/requests/verify-email.request';
import { ForgotPasswordRequest } from '../models/requests/forgot-password.request';
import { ResetPasswordRequest } from '../models/requests/reset-password.request';
import { SendEmailResponse } from '../models/responses/send-email.response';
import { VerifyEmailResponse } from '../models/responses/verify-email.response';
import { RegisterResponse } from '../models/responses/register.response';
import { LoginResponse } from '../models/responses/login.response';
import { ForgotPasswordResponse } from '../models/responses/forgot-password.response';
import { ResetPasswordResponse } from '../models/responses/reset-password.response';

export abstract class AuthApi {
  abstract sendEmail(data: SendEmailRequest): Observable<SendEmailResponse>;
  abstract verifyEmail(data: VerifyEmailRequest): Observable<VerifyEmailResponse>;
  abstract register(data: RegisterRequest): Observable<RegisterResponse>;
  abstract login(data: LoginRequest): Observable<LoginResponse>;
  abstract forgotPassword(data: ForgotPasswordRequest): Observable<ForgotPasswordResponse>;
  abstract resetPassword(data: ResetPasswordRequest): Observable<ResetPasswordResponse>;
}
