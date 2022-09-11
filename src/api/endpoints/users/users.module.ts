import { Module } from "@nestjs/common";
import { DynamoDBAdapter } from "src/api/infrastructure/providers/dynamoDB/dynamoDbAdapter";
import { UserRepository } from "src/api/infrastructure/repositories/userRepository";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";


@Module({
  providers: [UsersService, UserRepository, DynamoDBAdapter],
  controllers: [UsersController]
})
export class UsersModule {}
