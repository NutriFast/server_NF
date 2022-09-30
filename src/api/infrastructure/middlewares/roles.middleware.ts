import { ForbiddenException } from "@nestjs/common";
import { UsersService } from "src/api/endpoints/users/users.service";
import { Role } from "../constants/roles";

export class RolesMiddleware {
  constructor(public userService: UsersService) {}
  public async isMaster(user: any) {
    if (user.role == Role.master) return true;
    throw new ForbiddenException("not-a-master-user");
  }
}
