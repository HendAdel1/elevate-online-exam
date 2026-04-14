import { Injectable } from '@angular/core';
import { AuthApi } from '../api/auth.api';
import { map } from 'rxjs';
import { AuthAdapter } from '../adapters/auth.adapter';
import { SendEmailRequest } from '../models/requests/send-email.request';
import { LoginRequest } from '../models/requests/login.request';
import { RegisterRequest } from '../models/requests/register.request';
import { VerifyEmailRequest } from '../models/requests/verify-email.request';
import { ForgotPasswordRequest } from '../models/requests/forgot-password.request';
import { ResetPasswordRequest } from '../models/requests/reset-password.request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: AuthApi) {}

  sendEmail(data: SendEmailRequest) {
    return this.api.sendEmail(data).pipe(
      map(AuthAdapter.adaptSendEmail)
    );
  }

  login(data: LoginRequest) {
    return this.api.login(data).pipe(
      map(AuthAdapter.adaptLogin)
    );
  }

  register(data: RegisterRequest) {
    return this.api.register(data).pipe(
      map(AuthAdapter.adaptRegister)
    );
  }

  verifyEmail(data: VerifyEmailRequest) {
    return this.api.verifyEmail(data).pipe(
      map(AuthAdapter.adaptVerifyEmail)
    );
  }

  forgotPassword(data: ForgotPasswordRequest) {
    return this.api.forgotPassword(data).pipe(
      map(AuthAdapter.adaptForgotPassword)
    );
  }

  resetPassword(data: ResetPasswordRequest) {
    return this.api.resetPassword(data).pipe(
      map(AuthAdapter.adaptResetPassword)
    );
  }
}
