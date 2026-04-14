import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthEndpoints } from '../enums/auth-endpoints';
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

@Injectable({
  providedIn: 'root'
})

export class AuthApi {
  private http = inject(HttpClient);

  sendEmail(data: SendEmailRequest) {
    return this.http.post<SendEmailResponse>(AuthEndpoints.SendEmail, data);
  }

  verifyEmail(data: VerifyEmailRequest) {
    return this.http.post<VerifyEmailResponse>(AuthEndpoints.VerifyEmail, data);
  }

  register(data: RegisterRequest) {
    return this.http.post<RegisterResponse>(AuthEndpoints.Register, data);
  }

  login(data: LoginRequest) {
    return this.http.post<LoginResponse>(AuthEndpoints.Login, data);
  }

  forgotPassword(data: ForgotPasswordRequest) {
    return this.http.post<ForgotPasswordResponse>(AuthEndpoints.ForgotPassword, data);
  }

  resetPassword(data: ResetPasswordRequest) {
    return this.http.post<ResetPasswordResponse>(AuthEndpoints.ResetPassword, data);
  }
}
