import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as express from "express";
import * as functions from "firebase-functions";
import { AppModule } from "./src/app.module";
const expressServer = express();
const createFunction = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance)
  );
  app.enableCors({
    origin: '*',
    methods: "GET,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Authorization"
  });
  const config = new DocumentBuilder()
    .setTitle("NutriFast API")
    .setDescription("NutriFast API SWAGGER")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.init();
};
export const api = functions.https.onRequest(async (request, response) => {
  await createFunction(expressServer);
  expressServer(request, response);
});

// exports.app = functions.https.onRequest(async (request, response) => {
//   await createFunction(expressServer);
//   expressServer(request, response);
// });
