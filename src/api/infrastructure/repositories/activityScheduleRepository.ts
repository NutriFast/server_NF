import { Injectable } from "@nestjs/common";
import { ActivitiesScheduleDocument } from "../documents/activitiesScheduleDocument";
import { DynamoDBAdapter } from "../providers/dynamoDB/dynamoDbAdapter";
import { BaseRepository } from "./baseRepository";

@Injectable()
export class ActivitySchedulesRepository extends BaseRepository<ActivitiesScheduleDocument> {
  constructor(dynamoDBAdapter: DynamoDBAdapter) {
    super(
      ActivitiesScheduleDocument.tableName,
      ActivitiesScheduleDocument.name,
      ActivitiesScheduleDocument,
      dynamoDBAdapter
    );
  }

  public async findAll(): Promise<ActivitiesScheduleDocument[]> {
    const document: ActivitiesScheduleDocument[] = [];

    const iterator = await this.mapper.scan(ActivitiesScheduleDocument);
    for await (const record of iterator) document.push(record);
    if (document.length === 0) return null;
    return document;
  }

  public async getById(id: string): Promise<ActivitiesScheduleDocument> {
    const document = new ActivitiesScheduleDocument();
    document.id = id;
    return this.getDocument(document);
  }

  public async create(
    document: ActivitiesScheduleDocument,
    options?: any
  ): Promise<ActivitiesScheduleDocument> {
    return this.createDocument(document, options);
  }

  public async update(
    document: ActivitiesScheduleDocument
  ): Promise<ActivitiesScheduleDocument> {
    return this.updateDocument(document);
  }

  public async deleteById(id: string): Promise<ActivitiesScheduleDocument> {
    const document = new ActivitiesScheduleDocument();
    document.id = id;
    return this.deleteDocument(document);
  }
}
