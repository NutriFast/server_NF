import { Module } from "@nestjs/common";
import { DynamoDBAdapter } from "src/api/infrastructure/providers/dynamoDB/dynamoDbAdapter";
import { ActivityRepository } from "src/api/infrastructure/repositories/activityRepository";
import { ActivitySchedulesRepository } from "src/api/infrastructure/repositories/activityScheduleRepository";
import { ClientRepository } from "src/api/infrastructure/repositories/clientRepository";
import { ScheduleRepository } from "src/api/infrastructure/repositories/scheduleRepository";
import { ActivitySchedulesController } from "./activitySchedules.controller";
import { ActivitySchedulesService } from "./activitySchedules.service";
@Module({
  providers: [
    ActivitySchedulesService,
    ActivitySchedulesRepository,
    DynamoDBAdapter,
    ScheduleRepository,
    ActivityRepository,
    ClientRepository
  ],
  controllers: [ActivitySchedulesController],
})
export class ActivitySchedulesModule {}
