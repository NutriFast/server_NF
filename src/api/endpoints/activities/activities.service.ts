import { Injectable, NotFoundException } from "@nestjs/common";
import { ActivityDocument } from "src/api/infrastructure/documents/activityDocument";
import { ActivityRepository } from "src/api/infrastructure/repositories/activityRepository";
import { CreateActivityDTO } from "./dtos/createActivityDTO";
import { UpdateActivityDTO } from "./dtos/updateActivityDTO";

@Injectable()
export class ActivitiesService {
  constructor(private repository: ActivityRepository) {}

  public async create(dto: CreateActivityDTO) {
    const document = new ActivityDocument();

    document.build(null, dto.name);
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

  public async update(dto: UpdateActivityDTO) {
    const document = new ActivityDocument();
    document.build(dto.id, dto.name);
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
}
