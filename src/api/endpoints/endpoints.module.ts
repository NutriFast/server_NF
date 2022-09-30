import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { ActivitiesModule } from "./activities/activities.module";
import { AuthModule } from "./auth/auth.module";
import { ClientsModule } from "./clients/clients.module";
import { SchedulesModule } from "./schedules/schedule.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ActivitiesModule,
    UsersModule,
    ClientsModule,
    AuthModule,
    SchedulesModule,
    RouterModule.register([
      {
        path: "schedules",
        module: SchedulesModule,
      },
      {
        path: "auth",
        module: AuthModule,
      },
      {
        path: "clients",
        module: ClientsModule,
      },
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
