import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "@nestjs/core";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { ActivitiesModule } from "./activities/activities.module";

@Module({
  imports: [
    InfrastructureModule,
    ActivitiesModule,
    RouterModule.register([
      {
        path: "activities",
        module: ActivitiesModule,
      },
    ]),
  ],
})
export class EndpointsModule {}
