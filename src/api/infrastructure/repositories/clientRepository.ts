import { Injectable } from "@nestjs/common";
import { ClientDocument } from "../documents/clientDocument";
import { DynamoDBAdapter } from "../providers/dynamoDB/dynamoDbAdapter";
import { BaseRepository } from "./baseRepository";

@Injectable()
export class ClientRepository extends BaseRepository<ClientDocument> {
  constructor(dynamoDBAdapter: DynamoDBAdapter) {
    super(
      ClientDocument.tableName,
      ClientDocument.name,
      ClientDocument,
      dynamoDBAdapter
    );
  }

  public async findAll(): Promise<ClientDocument[]> {
    const document: ClientDocument[] = [];

    const iterator = await this.mapper.scan(ClientDocument);
    for await (const record of iterator) document.push(record);
    if (document.length === 0) return null;
    return document;
  }

  public async getById(id: string): Promise<ClientDocument> {
    const document = new ClientDocument();
    document.id = id;
    return this.getDocument(document);
  }

  public async create(
    document: ClientDocument,
    options?: any
  ): Promise<ClientDocument> {
    return this.createDocument(document, options);
  }

  public async update(document: ClientDocument): Promise<ClientDocument> {
    return this.updateDocument(document);
  }

  public async deleteById(id: string): Promise<ClientDocument> {
    const document = new ClientDocument();
    document.id = id;
    return this.deleteDocument(document);
  }

  public async getClientByUserId(userId: string): Promise<ClientDocument[]> {
    const clients = await this.findAll();
    const selectedClients = clients.filter((client) => {
      return client.userId == userId;
    });
    return selectedClients;
  }
}
