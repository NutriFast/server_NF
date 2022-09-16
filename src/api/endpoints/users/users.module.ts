import { Module } from "@nestjs/common";
import { DynamoDBAdapter } from "src/api/infrastructure/providers/dynamoDB/dynamoDbAdapter";
import { ClientRepository } from "src/api/infrastructure/repositories/clientRepository";
import { UserRepository } from "src/api/infrastructure/repositories/userRepository";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  providers: [UsersService, UserRepository, ClientRepository, DynamoDBAdapter],
  controllers: [UsersController],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
