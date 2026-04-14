import { UserRole } from "../../enums/user-role";

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}
