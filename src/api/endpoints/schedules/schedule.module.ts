import { Module } from "@nestjs/common";
import { RolesMiddleware } from "src/api/infrastructure/middlewares/roles.middleware";
import { DynamoDBAdapter } from "src/api/infrastructure/providers/dynamoDB/dynamoDbAdapter";
import { JwtStrategy } from "src/api/infrastructure/providers/passport/jwt.auth";
import { ActivityRepository } from "src/api/infrastructure/repositories/activityRepository";
import { ClientRepository } from "src/api/infrastructure/repositories/clientRepository";
import { ScheduleRepository } from "src/api/infrastructure/repositories/scheduleRepository";
import { SchedulesController } from "./schedule.controller";
import { SchedulesService } from "./schedule.service";

@Module({
  providers: [
    SchedulesService,
    ScheduleRepository,
    DynamoDBAdapter,
    JwtStrategy,
    RolesMiddleware,
    ClientRepository,
    ActivityRepository,
  ],
  controllers: [SchedulesController],
})
export class SchedulesModule {}
ClientRepository;
