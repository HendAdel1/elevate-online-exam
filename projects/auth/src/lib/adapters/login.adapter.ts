import { LoginResponse } from '../models/responses/login.response';

export class LoginAdapter {
  static adapt(res: LoginResponse): { token: string; message: string } {
    return {
      token: res.token ?? '',
      message: 'Login successful',
    };
  }
}
