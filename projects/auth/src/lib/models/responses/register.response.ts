import { User } from "./user.response";

export interface RegisterResponse {
  user: User;
  token: string;
}
