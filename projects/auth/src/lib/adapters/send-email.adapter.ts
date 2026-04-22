import { SendEmailResponse } from '../models/responses/send-email.response';

export class SendEmailAdapter {
  static adapt(res: SendEmailResponse) {
    return {
      message: res.message ?? 'Unknown response',
    };
  }
}
