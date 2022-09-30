import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({});
  const config = new DocumentBuilder()
    .setTitle("NutriFast API")
    .setDescription("NutriFast API SWAGGER")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.enableCors({
    origin: true,
    allowedHeaders: "Authorization",
    methods: "GET,PATCH,POST,DELETE",
    credentials: true,
  });

  await app.listen(process.env.ENVIRONMENT == 'DEV' ? process.env.PORT_DEV : process.env.PORT_PROD);
}
bootstrap();
