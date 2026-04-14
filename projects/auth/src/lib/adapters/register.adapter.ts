import { Adapter } from '../models/adapter';
import { RegisterResponse } from '../models/responses/register.response';

export class RegisterAdapter implements Adapter<RegisterResponse, { token: string; message: string }> {
  adapt(res: RegisterResponse): { token: string; message: string } {
    return {
      token: res.token ?? '',
      message: 'Registration successful',
    };
  }
}
