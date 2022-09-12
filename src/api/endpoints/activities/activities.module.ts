import { Module } from "@nestjs/common";
import { DynamoDBAdapter } from "src/api/infrastructure/providers/dynamoDB/dynamoDbAdapter";
import { ActivityRepository } from "src/api/infrastructure/repositories/activityRepository";
import { ActivitiesController } from "./activities.controller";
import { ActivitiesService } from "./activities.service";

@Module({
  providers: [ActivitiesService, ActivityRepository, DynamoDBAdapter],
  controllers: [ActivitiesController],
})
export class ActivitiesModule {}
