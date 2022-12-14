import { Logger } from "@nestjs/common";
import * as AWS from "aws-sdk";
import * as DynamoDB from "aws-sdk/clients/dynamodb";
import { GlobalConfigInstance } from "aws-sdk/lib/config";
import { DataMapper } from "@aws/dynamodb-data-mapper";

export class DynamoDBAdapter {
  private logger = new Logger(DynamoDBAdapter.name);

  private readonly awsConfig: GlobalConfigInstance;

  private readonly dynamoDb: DynamoDB;

  private readonly dataMapper: DataMapper;

  constructor() {
    try {
      this.awsConfig = new AWS.Config({
        region: process.env.AWS_DDB_TZ,
        credentials: {
          accessKeyId: process.env.AWS_DDB_ID,
          secretAccessKey: process.env.AWS_DDB_SECRET,
        },
      });
      this.dynamoDb = new DynamoDB(this.awsConfig);
      this.dataMapper = new DataMapper({
        client: this.dynamoDb,
      });
    } catch (err) {
      this.logger.error("Error in DynamoDB constructor", err);
    }
  }

  public getDataMapper(): DataMapper {
    return this.dataMapper;
  }
  public getDynamoDb() {
    return this.dynamoDb;
  }
}
