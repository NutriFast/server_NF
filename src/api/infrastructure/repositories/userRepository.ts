import { Injectable } from "@nestjs/common";
import { UserDocument } from "../documents/userDocument";
import { DynamoDBAdapter } from "../providers/dynamoDB/dynamoDbAdapter";
import { BaseRepository } from "./baseRepository";

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(dynamoDBAdapter: DynamoDBAdapter) {
    super(
      UserDocument.tableName,
      UserDocument.name,
      UserDocument,
      dynamoDBAdapter
    );
  }

  public async findAll(): Promise<UserDocument[]> {
    const document: UserDocument[] = [];

    const iterator = await this.mapper.scan(UserDocument);
    for await (const record of iterator) document.push(record);
    if (document.length === 0) return null;
    return document;
  }

  public async getById(id: string): Promise<UserDocument> {
    const document = new UserDocument();
    document.id = id;
    return this.getDocument(document);
  }

  public async create(
    document: UserDocument,
    options?: any
  ): Promise<UserDocument> {
    return this.createDocument(document, options);
  }

  public async update(document: UserDocument): Promise<UserDocument> {
    return this.updateDocument(document);
  }

  public async deleteById(id: string): Promise<UserDocument> {
    const document = new UserDocument();
    document.id = id;
    return this.deleteDocument(document);
  }

  public async getByName(name: string): Promise<UserDocument[]> {
    const document: UserDocument[] = [];

    const iterator = await this.mapper.scan(UserDocument);
    for await (const record of iterator) {
      document.push(record);
    }
    if (document.length === 0) return null;
    return document.filter((user) => {
      return (
        user.name.toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) != -1
      );
    });
  }
}
