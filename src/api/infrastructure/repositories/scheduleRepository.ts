import { Injectable } from "@nestjs/common";
import { ScheduleDocument } from "../documents/scheduleDocument";
import { DynamoDBAdapter } from "../providers/dynamoDB/dynamoDbAdapter";
import { BaseRepository } from "./baseRepository";

@Injectable()
export class ScheduleRepository extends BaseRepository<ScheduleDocument> {
  constructor(dynamoDBAdapter: DynamoDBAdapter) {
    super(
      ScheduleDocument.tableName,
      ScheduleDocument.name,
      ScheduleDocument,
      dynamoDBAdapter
    );
  }

  public async getById(id: string): Promise<ScheduleDocument> {
    const document = new ScheduleDocument();
    document.id = id;
    return this.getDocument(document);
  }
  public async create(
    document: ScheduleDocument,
    options?: any
  ): Promise<ScheduleDocument> {
    return this.createDocument(document, options);
  }
  public async getByClientId(clientId: string): Promise<ScheduleDocument[]> {
    const activities = await this.findAll();
    if (!activities) return [];
    const selectedActivities = activities.filter((activity) => {
      return activity.clientId == clientId;
    });
    return selectedActivities;
  }
  public async findAll(): Promise<ScheduleDocument[]> {
    const document: ScheduleDocument[] = [];

    const iterator = await this.mapper.scan(ScheduleDocument);
    for await (const record of iterator) document.push(record);
    if (document.length === 0) return null;
    return document;
  }
  public async delete(id): Promise<ScheduleDocument> {
    const document = new ScheduleDocument();
    document.id = id;
    return this.deleteDocument(document);
  }

  public async update(document: ScheduleDocument): Promise<ScheduleDocument> {
    return this.updateDocument(document);
  }
}
