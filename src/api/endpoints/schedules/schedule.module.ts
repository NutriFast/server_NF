import { Module } from "@nestjs/common";
import { RolesMiddleware } from "src/api/infrastructure/middlewares/roles.middleware";
import { DynamoDBAdapter } from "src/api/infrastructure/providers/dynamoDB/dynamoDbAdapter";
import { JwtStrategy } from "src/api/infrastructure/providers/passport/jwt.auth";
import { ClientRepository } from "src/api/infrastructure/repositories/clientRepository";
import { ScheduleRepository } from "src/api/infrastructure/repositories/scheduleRepository";
import { ClientsService } from "../clients/clients.service";
import { SchedulesController } from "./schedule.controller";
import { SchedulesService } from "./schedule.service";

@Module({
  providers: [
    SchedulesService,
    ScheduleRepository,
    DynamoDBAdapter,
    JwtStrategy,
    RolesMiddleware,
    ClientsService,
    ClientRepository,
  ],
  controllers: [SchedulesController],
})
export class SchedulesModule {}
ClientRepository;
