import { Module } from "@nestjs/common";
import { DynamoDBAdapter } from "src/api/infrastructure/providers/dynamoDB/dynamoDbAdapter";
import { ActivitySchedulesRepository } from "src/api/infrastructure/repositories/activityScheduleRepository";
import { ScheduleRepository } from "src/api/infrastructure/repositories/scheduleRepository";
import { ActivitySchedulesController } from "./activitySchedules.controller";
import { ActivitySchedulesService } from "./activitySchedules.service";
@Module({
  providers: [
    ActivitySchedulesService,
    ActivitySchedulesRepository,
    DynamoDBAdapter,
    ScheduleRepository,
  ],
  controllers: [ActivitySchedulesController],
})
export class ActivitySchedulesModule {}
