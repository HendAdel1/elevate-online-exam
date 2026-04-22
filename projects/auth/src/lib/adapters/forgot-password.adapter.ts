import { ForgotPasswordResponse } from '../models/responses/forgot-password.response';

export class ForgotPasswordAdapter {
  static adapt(res: ForgotPasswordResponse): { message: string; resetToken: string } {
    return {
      message: res.message ?? 'Unknown response',
      resetToken: res.resetToken ?? '',
    };
  }
}
