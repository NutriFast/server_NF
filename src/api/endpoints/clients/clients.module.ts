import { Module } from "@nestjs/common";
import { DynamoDBAdapter } from "src/api/infrastructure/providers/dynamoDB/dynamoDbAdapter";
import { JwtStrategy } from "src/api/infrastructure/providers/passport/jwt.auth";
import { ClientRepository } from "src/api/infrastructure/repositories/clientRepository";
import { ClientsController } from "./clients.controller";
import { ClientsService } from "./clients.service";

@Module({
  providers: [ClientsService, ClientRepository, DynamoDBAdapter, JwtStrategy],
  controllers: [ClientsController],
})
export class ClientsModule {}
