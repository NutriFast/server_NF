import { Roles } from "../constants/roles";

export interface User {
  id: string;
  email: string;
  role: Roles;
}
