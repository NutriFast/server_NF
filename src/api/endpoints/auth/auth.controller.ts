import { Body, Controller,Request, Logger, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LocalAuthGuard } from "src/api/infrastructure/middlewares/localAuth.guard";
import { CreateUserDTO } from "../users/dtos/createUserDTO";
import { AuthService } from "./auth.service";

  
  @Controller()
  export class AuthController {
    constructor(private readonly service: AuthService) {}
    private logger = new Logger(AuthController.name);
  
    @Post('/signin')
    async signIn(@Body() dto: CreateUserDTO) {
        this.logger.log(`POST -> /auth/signin`);
        return this.service.signIn(dto);
    }
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
      this.logger.log(`POST -> /auth/login`);
      return this.service.login(req.user);
    }
  }
  