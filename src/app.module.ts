
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EndpointsModule } from './api/endpoints/endpoints.module';
import { InfrastructureModule } from './api/infrastructure/infrastructure.module';

@Module({
    providers:[InfrastructureModule],
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '../.env'
        }),
        EndpointsModule
    ],
})
export class AppModule {}