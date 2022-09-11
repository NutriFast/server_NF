import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { ActivitiesModule } from "./activities/activities.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ActivitiesModule,
    UsersModule,
    RouterModule.register([
      {
        path: "users",
        module: UsersModule,
      },
      {
        path: "activities",
        module: ActivitiesModule,
      },
    ]),
  ],
})
export class EndpointsModule {}
