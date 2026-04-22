import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthHttpApi } from '../api/auth-http.api';
import { AuthAdapter } from '../adapters/auth.adapter';
import { SendEmailRequest } from '../models/requests/send-email.request';
import { LoginRequest } from '../models/requests/login.request';
import { RegisterRequest } from '../models/requests/register.request';
import { VerifyEmailRequest } from '../models/requests/verify-email.request';
import { ForgotPasswordRequest } from '../models/requests/forgot-password.request';
import { ResetPasswordRequest } from '../models/requests/reset-password.request';

@Injectable({ providedIn: 'root' })
export class DefaultAuthService extends AuthService {
  private api = inject(AuthHttpApi);

  sendEmail(data: SendEmailRequest) {
    return this.api.sendEmail(data).pipe(
      map(AuthAdapter.adaptSendEmail)
    );
  }

  login(data: LoginRequest) {
    return this.api.login(data).pipe(
      map(AuthAdapter.adaptLogin),
      catchError((err: HttpErrorResponse) =>
        of({ token: '', message: this.getErrorMessage(err) })
      )
    );
  }

  register(data: RegisterRequest) {
    return this.api.register(data).pipe(
      map(AuthAdapter.adaptRegister),
      catchError((err: HttpErrorResponse) =>
        of({ token: '', message: this.getErrorMessage(err) })
      )
    );
  }

  verifyEmail(data: VerifyEmailRequest) {
    return this.api.verifyEmail(data).pipe(
      map(AuthAdapter.adaptVerifyEmail),
      catchError((err: HttpErrorResponse) =>
        of({ message: this.getErrorMessage(err) })
      )
    );
  }

  forgotPassword(data: ForgotPasswordRequest) {
    return this.api.forgotPassword(data).pipe(
      map(AuthAdapter.adaptForgotPassword),
      catchError((err: HttpErrorResponse) =>
        of({ message: this.getErrorMessage(err), resetToken: '' })
      )
    );
  }

  resetPassword(data: ResetPasswordRequest) {
    return this.api.resetPassword(data).pipe(
      map(AuthAdapter.adaptResetPassword),
      catchError((err: HttpErrorResponse) =>
        of({ message: this.getErrorMessage(err) })
      )
    );
  }

  private getErrorMessage(err: HttpErrorResponse): string {
    return err?.error?.message ?? err?.message ?? 'Something went wrong';
  }
}
