import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { ActivitiesModule } from "./activities/activities.module";
import { ClientsModule } from "./clients/clients.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ActivitiesModule,
    UsersModule,
    ClientsModule,
    RouterModule.register([
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
