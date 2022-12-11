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
import { AuthService } from "./auth.service";
import { GoogleAuthenticationService } from "./googleAuthentication.service";
@ApiTags("Auth")
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private googleAuthenticationService: GoogleAuthenticationService
  ) {}
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
  @Get("backdoor")
  getHealty() {
    return this.authService.login({ email: "gabrielmurtalima99@gmail.com" });
  }
  @Post("/google")
  async authenticate(@Body() tokenData: any, @Req() request) {
    this.logger.log("POST -> auth/google");
    const data = await this.googleAuthenticationService.authenticate(
      tokenData.token
    );
    if (data) return this.authService.login(data);

    return data.toString();
  }
}
