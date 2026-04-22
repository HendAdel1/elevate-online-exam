import { VerifyEmailResponse } from '../models/responses/verify-email.response';

export class VerifyEmailAdapter {
  static adapt(res: VerifyEmailResponse): { message: string } {
    return {
      message: res.message ?? 'Unknown response',
    };
  }
}
