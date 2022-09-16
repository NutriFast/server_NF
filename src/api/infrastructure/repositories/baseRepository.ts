import { Logger } from "@nestjs/common";
import { DataMapper } from "@aws/dynamodb-data-mapper";
import { BaseDocument } from "../documents/baseDocument";
import { DynamoDBAdapter } from "../providers/dynamoDB/dynamoDbAdapter";
import { ZeroArgumentsConstructor } from "../interfaces/zeroArgumentContructor.interface";

export class BaseRepository<T extends BaseDocument> {
  private documentClass: ZeroArgumentsConstructor<T>;

  protected logger: Logger;

  protected mapper: DataMapper;

  protected tableName: string;

  constructor(
    tableName: string,
    repositoryClassName: string,
    documentClass: ZeroArgumentsConstructor<T>,
    protected dynamoDBAdapter: DynamoDBAdapter
  ) {
    this.tableName = tableName;
    this.documentClass = documentClass;
    this.logger = new Logger(repositoryClassName);
    this.mapper = this.dynamoDBAdapter.getDataMapper();
    this.logger.log(`${repositoryClassName} Initialized.`);
  }

  protected async getDocument(document: T): Promise<T> {
    try {
      return await this.mapper.get<T>(document);
    } catch (err) {
      this.logger.error(err);
    }
  }

  protected async createDocument(document: T, options?: any): Promise<T> {
    try {
      if (!options?.keep_id) delete document.id;
      return await this.mapper.put<T>(document);
    } catch (err) {
      this.logger.error(err);
    }
  }

  protected async updateDocument(document: T): Promise<T> {
    try {
      return await this.mapper.update<T>(document, {
        onMissing: "remove",
        condition: {
          type: "Equals",
          subject: "id",
          object: document.id,
        },
      });
    } catch (err) {
      this.logger.error(err);
    }
  }

  protected async deleteDocument(document: T): Promise<T> {
    try {
      return await this.mapper.delete<T>(document);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
