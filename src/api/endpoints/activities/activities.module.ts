import { Module } from "@nestjs/common";
import { RolesMiddleware } from "src/api/infrastructure/middlewares/roles.middleware";
import { DynamoDBAdapter } from "src/api/infrastructure/providers/dynamoDB/dynamoDbAdapter";
import { JwtStrategy } from "src/api/infrastructure/providers/passport/jwt.auth";
import { ActivityRepository } from "src/api/infrastructure/repositories/activityRepository";
import { ClientRepository } from "src/api/infrastructure/repositories/clientRepository";
import { UserRepository } from "src/api/infrastructure/repositories/userRepository";
import { UsersService } from "../users/users.service";
import { ActivitiesController } from "./activities.controller";
import { ActivitiesService } from "./activities.service";

@Module({
  providers: [
    ActivitiesService,
    ActivityRepository,
    DynamoDBAdapter,
    JwtStrategy,
    RolesMiddleware,
    UsersService,
    UserRepository,
    ClientRepository,
  ],
  controllers: [ActivitiesController],
})
export class ActivitiesModule {}
