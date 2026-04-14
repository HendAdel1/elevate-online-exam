import { Adapter } from '../models/adapter';
import { LoginResponse } from '../models/responses/login.response';

export class LoginAdapter implements Adapter<LoginResponse, { token: string; message: string }> {
  adapt(res: LoginResponse): { token: string; message: string } {
    return {
      token: res.token ?? '',
      message: 'Login successful',
    };
  }
}
