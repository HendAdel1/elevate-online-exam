import { Adapter } from '../models/adapter';

export interface ResetPasswordResponse {
  message: string;
}

export class ResetPasswordAdapter implements Adapter<ResetPasswordResponse, { message: string }> {
  adapt(res: ResetPasswordResponse): { message: string } {
    return {
      message: res?.message ?? 'Unknown response',
    };
  }
}
