import { Module } from "@nestjs/common";
import { RolesMiddleware } from "src/api/infrastructure/middlewares/roles.middleware";
import { DynamoDBAdapter } from "src/api/infrastructure/providers/dynamoDB/dynamoDbAdapter";
import { JwtStrategy } from "src/api/infrastructure/providers/passport/jwt.auth";
import { ClientRepository } from "src/api/infrastructure/repositories/clientRepository";
import { UserRepository } from "src/api/infrastructure/repositories/userRepository";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  providers: [UsersService, UserRepository, ClientRepository, DynamoDBAdapter, JwtStrategy, RolesMiddleware],
  controllers: [UsersController],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
