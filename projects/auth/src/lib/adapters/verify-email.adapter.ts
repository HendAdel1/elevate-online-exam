import { Adapter } from '../models/adapter';
import { VerifyEmailResponse } from '../models/responses/verify-email.response';

export class VerifyEmailAdapter implements Adapter<VerifyEmailResponse, { message: string }> {
  adapt(res: VerifyEmailResponse): { message: string } {
    return {
      message: res.message ?? 'Unknown response',
    };
  }
}
