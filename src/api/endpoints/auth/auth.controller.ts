import {
  Controller,
  Post,
  UseGuards,
  Logger,
  Body,
  Req,
} from "@nestjs/common";
import { LocalAuthGuard } from "src/api/infrastructure/guards/localAuth.guard";
import { AuthService } from "./auth.service";
import { SignInDTO } from "./dtos/signInDTO";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  private logger = new Logger(AuthController.name);
  
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req) {
    this.logger.log(`POST -> /login`);
    return this.authService.login(req.user);
  }

  @Post("signIn")
  async signIn(@Body() dto: SignInDTO) {
    this.logger.log(`POST -> /signin`);
    return this.authService.signIn(dto);
  }
}
