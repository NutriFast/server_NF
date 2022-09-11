

import { Injectable } from '@nestjs/common';
import { ActivityDocument } from '../providers/dynamoDB/documents/activityDocument';
import { DynamoDBAdapter } from '../providers/dynamoDB/dynamoDbAdapter';
import { BaseRepository } from './baseRepository';

@Injectable()
export class ActivityRepository  extends BaseRepository<ActivityDocument> {
  constructor(dynamoDBAdapter: DynamoDBAdapter) {
    super(
      ActivityDocument.tableName,
      ActivityDocument.name,
      ActivityDocument,
      dynamoDBAdapter,
    );
  }

  public async findAll(): Promise<ActivityDocument[]> {
    const withdrawals: ActivityDocument[] = [];
  
    const iterator = await this.mapper.scan(ActivityDocument);
    for await (const record of iterator)  withdrawals.push(record);
    if (withdrawals.length === 0) return null;
    return withdrawals;
  }

  public async getById(id: string): Promise<ActivityDocument> {
    const document = new ActivityDocument();
    document.id = id;
    return this.getDocument(document);
  }

  public async create(
    document: ActivityDocument,
    options?: any,
  ): Promise<ActivityDocument> {
    return this.createDocument(document, options);
  }

  public async update(
    document: ActivityDocument,
  ): Promise<ActivityDocument> {
    return this.updateDocument(document);
  }

  public async deleteById(id: string): Promise<ActivityDocument> {
    const document = new ActivityDocument();
    document.id = id;
    return this.deleteDocument(document);
  }
}
