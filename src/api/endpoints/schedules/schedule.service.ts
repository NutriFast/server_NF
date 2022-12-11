import { Injectable, NotFoundException } from "@nestjs/common";
import { ScheduleDocument } from "src/api/infrastructure/documents/scheduleDocument";
import { ActivityRepository } from "src/api/infrastructure/repositories/activityRepository";
import { ScheduleRepository } from "src/api/infrastructure/repositories/scheduleRepository";
import { CreateScheduleDTO } from "./dtos/createScheduleDTO";
import { UpdateScheduleDTO } from "./dtos/updateScheduleDTO";

@Injectable()
export class SchedulesService {
  constructor(
    private repository: ScheduleRepository,
    private activityRepository: ActivityRepository
  ) {}
  async createClientSchedule(clientId: string, dto: CreateScheduleDTO) {
    const document = new ScheduleDocument();
    document.build(null, clientId, new Date());
    return this.repository.create(document);
  }
  async getByClientId(clientId: string) {
    return this.repository.getByClientId(clientId);
  }
  async delete(id: string) {
    return this.repository.delete(id);
  }
  public async update(dto: UpdateScheduleDTO, id) {
    const document = new ScheduleDocument();
    document.build(id, dto.clientId, new Date());
    let result;
    try {
      result = await this.repository.update(document);
    } catch (err) {
      throw new NotFoundException(err);
    }
    return result;
  }
  public async getActivitiesFromSchedule(scheduleId: string) {
    const activities = await this.activityRepository.findAll();
  }
}
