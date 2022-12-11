import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "src/api/infrastructure/constants/jwtSecret";
import { DynamoDBAdapter } from "src/api/infrastructure/providers/dynamoDB/dynamoDbAdapter";
import { GoogleStrategy } from "src/api/infrastructure/providers/passport/google.stategy";
import { JwtStrategy } from "src/api/infrastructure/providers/passport/jwt.auth";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GoogleAuthenticationService } from "./googleAuthentication.service";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expireIn },
    }),
  ],
  providers: [
    DynamoDBAdapter,
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    GoogleAuthenticationService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
