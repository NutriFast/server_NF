import { Logger } from '@nestjs/common';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { BaseDocument } from '../providers/dynamoDB/documents/baseDocument';
import { DynamoDBAdapter } from '../providers/dynamoDB/dynamoDbAdapter';


interface ZeroArgumentsConstructor<T> {
  new (): T;
}

export class BaseRepository<T extends BaseDocument> {
  private documentClass: ZeroArgumentsConstructor<T>;

  protected logger: Logger;

  protected mapper: DataMapper;

  protected tableName: string;

  constructor(
    tableName: string,
    repositoryClassName: string,
    documentClass: ZeroArgumentsConstructor<T>,
    protected dynamoDBAdapter: DynamoDBAdapter,
  ) {
    this.tableName = tableName;
    this.documentClass = documentClass;
    this.logger = new Logger(repositoryClassName);
    this.mapper = this.dynamoDBAdapter.getDataMapper();
    this.checkIfTableExists();
    this.logger.log(`${repositoryClassName} Initialized.`);
  }

  protected checkIfTableExists() {
    (async () => {
      await this.mapper
        .ensureTableExists(this.documentClass, {
          readCapacityUnits: 1,
          writeCapacityUnits: 1,
        })
        .then(() => {
          this.logger.log(
            `Table ${this.tableName} existed or has been created.`,
          );
        })
        .catch(e => {
          this.logger.error(
            `Error checking the existence of ${this.tableName} table ${e.message}`,
          );
        });
    })();
  }

  protected async getDocument(document: T): Promise<T> {
    try {
      return await this.mapper.get<T>(document);
    } catch (err) {
      this.logger.error(
        `Error while fetching document from ${this.tableName} table.`,
        err,
      );
      if (err.name === 'ItemNotFoundException') {
        throw new Error(
          `Item not found in ${this.tableName} table with id -> ${document.id}`,
        );
      }
      throw new Error(
        `Error while fetching document from ${this.tableName} table.`,
      );
    }
  }

  protected async createDocument(document: T, options?: any): Promise<T> {
    try {
      if (!options?.keep_id) delete document.id;

      return await this.mapper.put<T>(document);
    } catch (err) {
      this.logger.error(
        `Error while creating document on ${this.tableName} table.`,
        err,
      );
      throw new Error(
        `Error while creating document on ${this.tableName} table.`,
      );
    }
  }

  protected async updateDocument(document: T): Promise<T> {
    try {
      return await this.mapper.update<T>(document, {
        onMissing: 'remove',
        condition: {
          type: 'Equals',
          subject: 'id',
          object: document.id,
        },
      });
    } catch (err) {
      if (err?.name === 'ConditionalCheckFailedException') {
        this.logger.error(
          `AWS_SNS_INSTALLMENT_RETRY_TOPIC_ARN${this.tableName} table with id -> ${document.id}.`,
          err,
        );
        throw new Error(
          `AWS_SNS_INSTALLMENT_RETRY_TOPIC_ARN${this.tableName} table with id -> ${document.id}.`,
        );
      }
      this.logger.error(
        `Error while updating document on ${this.tableName} table.`,
        err,
      );
      throw new Error(
        `Error while updating document on ${this.tableName} table.`,
      );
    }
  }

  protected async deleteDocument(document: T): Promise<T> {
    try {
      return await this.mapper.delete<T>(document, { returnValues: 'ALL_OLD' });
    } catch (err) {
      this.logger.error(
        `Error while deleting document from ${this.tableName} table.`,
        err,
      );
      throw new Error(
        `Error while deleting document from ${this.tableName} table.`,
      );
    }
  }
}
