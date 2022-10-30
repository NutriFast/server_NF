import { Injectable, NotFoundException } from "@nestjs/common";
import { ClientDocument } from "src/api/infrastructure/documents/clientDocument";
import { ClientRepository } from "src/api/infrastructure/repositories/clientRepository";
import { CreateClientDTO } from "./dtos/createClientDTO";
import { UpdateClientDTO } from "./dtos/updateClientDTO";

@Injectable()
export class ClientsService {
  constructor(private repository: ClientRepository) {}

  public async getClientByUserId(userId: string) {
    const clients = await this.repository.getClientByUserId(userId);
    clients.map(async (client) => await this.getFactorsFromClient(client));
    return clients;
  }

  public async create(dto: CreateClientDTO, userId: string) {
    const document = new ClientDocument();

    document.build(
      null,
      dto.name,
      dto.birthDate,
      dto.weight,
      dto.height,
      dto.phone,
      userId,
      dto.gender
    );
    return this.repository.create(document);
  }

  public async list() {
    return this.repository.findAll();
  }

  public async get(id: string) {
    let result;
    try {
      result = await this.repository.getById(id);
    } catch (err) {
      throw new NotFoundException(err);
    }
    return result;
  }

  public async update(dto: UpdateClientDTO) {
    const document = new ClientDocument();
    document.build(
      null,
      dto.name,
      dto.birthDate,
      dto.weight,
      dto.height,
      dto.phone,
      dto.userId,
      dto.gender
    );
    let result;
    try {
      result = await this.repository.update(document);
    } catch (err) {
      throw new NotFoundException(err);
    }
    return result;
  }

  public async delete(id: string) {
    return this.repository.deleteById(id);
  }

  public async getByName(name: string) {
    return this.repository.getByName(name);
  }

  public getAgeFromBirthDate(stringDate: Date) {
    const today = new Date();
    const birthDate = new Date(stringDate);
    let years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate()))
      years--;
    return years;
  }

  public getFactorsFromClient(client: ClientDocument) {
    const age = this.getAgeFromBirthDate(client.birthDate);
    console.log(age);
    if (client.gender == "Masculino") {
      client.factorHarris =
        66 + 13.8 * client.weight + 5 * client.height - 6.8 * age;
      if (10 <= age && age << 18)
        client.factorFAO = 17.686 * client.weight + 658.2;
      if (18 <= age && age << 30)
        client.factorFAO = 15.057 * client.weight + 692.6;
      if (30 <= age && age << 60)
        client.factorFAO = 11.472 * client.weight + 873.1;
      if (60 <= age) client.factorFAO = 11.711 * client.weight + 587.7;
      client.factorMifflin = 10 * client.weight + 6.25 * client.height;
      console.log(client.factorMifflin);
      return client;
    }
    return client;
  }
}
