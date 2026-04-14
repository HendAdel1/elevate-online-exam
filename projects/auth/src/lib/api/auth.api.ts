import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthEndPoint } from '../enums/auth-endpoints';
import { SendEmailRequest } from '../models/requests/send-email.request';
import { RegisterRequest } from '../models/requests/register.request';
import { LoginRequest } from '../models/requests/login.request';
import { SendEmailResponse } from '../models/responses/send-email.response';
import { VerifyEmailResponse } from '../models/responses/verify-email.response';
import { RegisterResponse } from '../models/responses/register.response';
import { LoginResponse } from '../models/responses/login.response';

@Injectable({
  providedIn: 'root'
})

export class AuthApi {
  private http = inject(HttpClient);

  sendEmail(data: SendEmailRequest) {
    return this.http.post<SendEmailResponse>(AuthEndPoint.SENDEMAIL, data);
  }

  verifyEmail(data: any) {
    return this.http.post<VerifyEmailResponse>(AuthEndPoint.VERIFYEMAIL, data);
  }

  register(data: RegisterRequest) {
    return this.http.post<RegisterResponse>(AuthEndPoint.REGISTER, data);
  }

  login(data: LoginRequest) {
    return this.http.post<LoginResponse>(AuthEndPoint.LOGIN, data);
  }
}
