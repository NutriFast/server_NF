import {
  Controller,
  Post,
  UseGuards,
  Logger,
  Body,
  Req,
  Get,
  ForbiddenException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GoogleAuthGuard } from "src/api/infrastructure/guards/googleAuth.guard";
import { GoogleStrategy } from "src/api/infrastructure/providers/passport/google.stategy";
import { AuthService } from "./auth.service";
import { LogInDTO } from "./dtos/loginDTO";
import { SignInDTO } from "./dtos/signInDTO";
@ApiTags("Auth")
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  private logger = new Logger(AuthController.name);

  @ApiOperation({
    description:
      "This endpoint will make login with google and redirect to GET -> /auth/redirect",
  })
  @Get()
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {}

  @Get("redirect")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req) {
    if (req.user) return this.authService.login(req.user);
    else return new ForbiddenException("Failed to login with google");
  }
  @Get("healty")
  getHealty() {
    return "Healty"
  }
}
