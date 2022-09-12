import { Module } from "@nestjs/common";

import { DynamoDBAdapter } from "./dynamoDbAdapter";

@Module({
  imports: [DynamoDBAdapter],
  providers: [DynamoDBAdapter],
  exports: [DynamoDBAdapter],
})
export class DynamoDBAdapterModule {}
