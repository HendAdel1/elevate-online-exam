import { ResetPasswordResponse } from '../models/responses/reset-password.response';

export class ResetPasswordAdapter {
  static adapt(res: ResetPasswordResponse): { message: string } {
    return {
      message: res?.message ?? 'Unknown response',
    };
  }
}
