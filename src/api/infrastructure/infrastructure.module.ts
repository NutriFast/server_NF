import { Module } from "@nestjs/common";
import { DynamoDBAdapterModule } from "./providers/dynamoDB/dynamoDbAdapter.module";

@Module({
  imports: [DynamoDBAdapterModule],
  exports: [DynamoDBAdapterModule],
})
export class InfrastructureModule {}
