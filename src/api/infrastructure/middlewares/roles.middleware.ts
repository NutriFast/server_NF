import { ForbiddenException } from "@nestjs/common";
import { UsersService } from "src/api/endpoints/users/users.service";

export class RolesMiddleware {
    constructor(private userService:UsersService){}
    public async isMaster(req:any) {
        if(req.user){
            if(req.user.id){
                const user = await this.userService.get(req.user.id);
                if(user.role == req) return true
            }
        }
        throw new ForbiddenException('not-a-master-user')
    }
    
}