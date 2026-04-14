import { Adapter } from '../models/adapter';
import { ResetPasswordResponse } from '../models/responses/reset-password.response';

export class ResetPasswordAdapter implements Adapter<ResetPasswordResponse, { message: string }> {
  adapt(res: ResetPasswordResponse): { message: string } {
    return {
      message: res?.message ?? 'Unknown response',
    };
  }
}
