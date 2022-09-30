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
    .setDescription("This is a nutricion API made for a TCC")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.enableCors({
    origin: true,
    allowedHeaders: "Content-Type, Content-Host, Authorization",
    methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
