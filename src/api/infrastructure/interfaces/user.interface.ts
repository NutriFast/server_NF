import { Roles } from "../constants/roles";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Roles;
}
