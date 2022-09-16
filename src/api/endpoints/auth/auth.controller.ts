import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Logger,
  Body,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/api/infrastructure/guards/jwtAuth.guard";
import { LocalAuthGuard } from "src/api/infrastructure/guards/localAuth.guard";
import { CreateUserDTO } from "../users/dtos/createUserDTO";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  private logger = new Logger(AuthController.name);
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    this.logger.log(`GET -> /login`);
    return this.authService.login(req.user);
  }

  @Post("signIn")
  async signIn(@Body() dto: CreateUserDTO) {
    this.logger.log(`POST -> /signin`);
    return this.authService.signIn(dto);
  }
}
