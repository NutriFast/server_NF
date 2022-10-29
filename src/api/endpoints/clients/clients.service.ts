import { Injectable, NotFoundException } from "@nestjs/common";
import { ClientDocument } from "src/api/infrastructure/documents/clientDocument";
import { ClientRepository } from "src/api/infrastructure/repositories/clientRepository";
import { CreateClientDTO } from "./dtos/createClientDTO";
import { UpdateClientDTO } from "./dtos/updateClientDTO";

@Injectable()
export class ClientsService {
  constructor(private repository: ClientRepository) {}

  public async getClientByUserId(userId: string) {
    return this.repository.getClientByUserId(userId);
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
      dto.userId,
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
}
