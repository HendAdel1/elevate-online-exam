import { Adapter } from '../models/adapter';
import { SendEmailResponse } from '../models/responses/send-email.response';

export class SendEmailAdapter implements Adapter<SendEmailResponse, { message: string }> {

  adapt(res: SendEmailResponse) {
    return {
      message: res.message ?? 'Unknown response',
    };
  }
}
