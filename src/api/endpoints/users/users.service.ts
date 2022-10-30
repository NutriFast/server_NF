import { Injectable, NotFoundException } from "@nestjs/common";
import { Role, Roles } from "src/api/infrastructure/constants/roles";
import { UserDocument } from "src/api/infrastructure/documents/userDocument";
import { ClientRepository } from "src/api/infrastructure/repositories/clientRepository";
import { UserRepository } from "src/api/infrastructure/repositories/userRepository";
import { CreateUserDTO } from "./dtos/createUserDTO";
import { UpdateUserDTO } from "./dtos/updateUserDTO";

@Injectable()
export class UsersService {
  constructor(
    private repository: UserRepository,
    private clientRepository: ClientRepository
  ) {}
  public async create(dto: CreateUserDTO) {
    const document = new UserDocument();

    document.build(null, dto.name, dto.email, Role.normal);
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
  public async update(dto: UpdateUserDTO) {
    const document = new UserDocument();
    document.build(dto.id, dto.name, dto.email, dto.role);
    let result;
    try {
      result = await this.repository.update(document);
    } catch (err) {
      throw new NotFoundException(err);
    }
    return result;
  }
  public async getClients(id: string) {
    return this.clientRepository.getClientByUserId(id);
  }
  public async delete(id: string) {
    return this.repository.deleteById(id);
  }
  public async getByEmail(email: string) {
    return this.repository.getByEmail(email);
  }
}
