import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EndpointsModule } from "./api/endpoints/endpoints.module";
import { InfrastructureModule } from "./api/infrastructure/infrastructure.module";

@Module({
  providers: [InfrastructureModule],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EndpointsModule,
  ],
})
export class AppModule {}
