import { User } from "./user.response";
export interface LoginResponse {

  status: boolean;
  code: number;
  payload: {
    user: User;
    token: string;
  };
  
}