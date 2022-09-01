import { NestFactory } from '@nestjs/core';
import { EndpointsModule } from './api/endpoints/endpoints.module';

async function bootstrap() {
  const app = await NestFactory.create(EndpointsModule);
  await app.listen(3000);
}
bootstrap();
