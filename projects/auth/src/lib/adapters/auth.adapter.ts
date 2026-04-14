import { LoginAdapter } from './login.adapter';
import { RegisterAdapter } from './register.adapter';
import { SendEmailAdapter } from './send-email.adapter';
import { ForgotPasswordAdapter } from './forgot-password.adapter';
import { VerifyEmailAdapter } from './verify-email.adapter';
import { ResetPasswordAdapter } from './reset-password.adapter';
import { LoginResponse } from "../models/responses/login.response";
import { RegisterResponse } from "../models/responses/register.response";
import { SendEmailResponse } from "../models/responses/send-email.response";
import { ForgotPasswordResponse } from "../models/responses/forgot-password.response";
import { VerifyEmailResponse } from "../models/responses/verify-email.response";
import { ResetPasswordResponse } from './reset-password.adapter';

export class AuthAdapter {

  static adaptSendEmail(res: SendEmailResponse) {
    return new SendEmailAdapter().adapt(res);
  }

  static adaptLogin(res: LoginResponse) {
    return new LoginAdapter().adapt(res);
  }

  static adaptRegister(res: RegisterResponse) {
    return new RegisterAdapter().adapt(res);
  }

  static adaptForgotPassword(res: ForgotPasswordResponse) {
    return new ForgotPasswordAdapter().adapt(res);
  }

  static adaptVerifyEmail(res: VerifyEmailResponse) {
    return new VerifyEmailAdapter().adapt(res);
  }

  static adaptResetPassword(res: ResetPasswordResponse) {
    return new ResetPasswordAdapter().adapt(res);
  }
}
