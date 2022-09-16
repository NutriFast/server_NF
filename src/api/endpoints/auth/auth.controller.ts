import {
  Controller,
  Post,
  UseGuards,
  Logger,
  Body,
  Req,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { jwtConstants } from "src/api/infrastructure/constants/jwtSecret";
import { LocalAuthGuard } from "src/api/infrastructure/guards/localAuth.guard";
import { AuthService } from "./auth.service";
import { LogInDTO } from "./dtos/loginDTO";
import { SignInDTO } from "./dtos/signInDTO";
@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  private logger = new Logger(AuthController.name);

  @ApiOperation({ description: 'This endpoint will make login and return a jwt token' })
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req, @Body() dto: LogInDTO) {
    console.log(jwtConstants.secret)
    this.logger.log(`POST -> /login`);
    return this.authService.login(req.user);
  }

  @ApiOperation({ description: 'This endpoint will create a user' })
  @Post("signIn")
  async signIn(@Body() dto: SignInDTO) {
    this.logger.log(`POST -> /signin`);
    return this.authService.signIn(dto);
  }
}
