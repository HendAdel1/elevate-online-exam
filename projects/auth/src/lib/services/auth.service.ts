import { Injectable } from '@angular/core';
import { AuthApi } from '../api/auth.api';
import { map } from 'rxjs';
import { AuthAdapter } from '../adapters/auth.adapter';
import { SendEmailRequest } from '../models/requests/send-email.request';
import { LoginRequest } from '../models/requests/login.request';
import { RegisterRequest } from '../models/requests/register.request';

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
}
