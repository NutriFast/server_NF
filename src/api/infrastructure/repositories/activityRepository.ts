import { Injectable } from "@nestjs/common";
import { ActivityDocument } from "../documents/activityDocument";
import { DynamoDBAdapter } from "../providers/dynamoDB/dynamoDbAdapter";
import { BaseRepository } from "./baseRepository";

@Injectable()
export class ActivityRepository extends BaseRepository<ActivityDocument> {
  constructor(dynamoDBAdapter: DynamoDBAdapter) {
    super(
      ActivityDocument.tableName,
      ActivityDocument.name,
      ActivityDocument,
      dynamoDBAdapter
    );
  }

  public async findAll(): Promise<ActivityDocument[]> {
    const document: ActivityDocument[] = [];

    const iterator = await this.mapper.scan(ActivityDocument);
    for await (const record of iterator) document.push(record);
    if (document.length === 0) return null;
    return document;
  }

  public async getById(id: string): Promise<ActivityDocument> {
    const document = new ActivityDocument();
    document.id = id;
    return this.getDocument(document);
  }

  public async create(
    document: ActivityDocument,
    options?: any
  ): Promise<ActivityDocument> {
    return this.createDocument(document, options);
  }

  public async update(document: ActivityDocument): Promise<ActivityDocument> {
    return this.updateDocument(document);
  }

  public async deleteById(id: string): Promise<ActivityDocument> {
    const document = new ActivityDocument();
    document.id = id;
    return this.deleteDocument(document);
  }
}
