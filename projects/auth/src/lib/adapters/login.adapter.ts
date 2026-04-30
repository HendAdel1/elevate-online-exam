import { LoginResult } from '../models/responses/login-result.response';
import { LoginResponse } from '../models/responses/login.response';
export class LoginAdapter {
  static adapt(res: LoginResponse): LoginResult  {
    return {
      token: res.payload?.token ?? '',
      user: res.payload?.user ?? null,
      message: 'Login successful',
    };
  }
}
