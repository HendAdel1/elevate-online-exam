import { RegisterResponse } from '../models/responses/register.response';

export class RegisterAdapter {
  static adapt(res: RegisterResponse): { token: string; message: string } {
    return {
      token: res.token ?? '',
      message: 'Registration successful',
    };
  }
}
