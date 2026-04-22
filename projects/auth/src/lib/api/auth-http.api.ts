import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthApi } from './auth.api';
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
import { AuthEndPoints } from '../enums/auth-endpoints';

@Injectable({ 
  providedIn: 'root' 
})

export class AuthHttpApi extends AuthApi {
  private http = inject(HttpClient);

  sendEmail(data: SendEmailRequest) {
    return this.http.post<SendEmailResponse>(AuthEndPoints.SEND_EMAIL, data);
  }

  verifyEmail(data: VerifyEmailRequest) {
    return this.http.post<VerifyEmailResponse>(AuthEndPoints.VERIFY_EMAIL, data);
  }

  register(data: RegisterRequest) {
    return this.http.post<RegisterResponse>(AuthEndPoints.REGISTER, data);
  }

  login(data: LoginRequest) {
    return this.http.post<LoginResponse>(AuthEndPoints.LOGIN, data);
  }

  forgotPassword(data: ForgotPasswordRequest) {
    return this.http.post<ForgotPasswordResponse>(AuthEndPoints.FORGOT_PASSWORD, data);
  }

  resetPassword(data: ResetPasswordRequest) {
    return this.http.post<ResetPasswordResponse>(AuthEndPoints.RESET_PASSWORD, data);
  }
}
