import { Roles } from "../constants/roles";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Roles
}
