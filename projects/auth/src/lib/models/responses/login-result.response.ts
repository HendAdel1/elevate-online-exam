import { User } from "./user.response";

export interface LoginResult {
  token: string;
  user: User | null;
  message: string;
}