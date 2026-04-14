import { Adapter } from '../models/adapter';
import { ForgotPasswordResponse } from '../models/responses/forgot-password.response';

export class ForgotPasswordAdapter implements Adapter<ForgotPasswordResponse, { message: string; resetToken: string }> {
  adapt(res: ForgotPasswordResponse): { message: string; resetToken: string } {
    return {
      message: res.message ?? 'Unknown response',
      resetToken: res.resetToken ?? '',
    };
  }
}
