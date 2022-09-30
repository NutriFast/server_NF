import { Injectable, NotFoundException } from "@nestjs/common";
import { ScheduleDocument } from "src/api/infrastructure/documents/scheduleDocument";
import { ScheduleRepository } from "src/api/infrastructure/repositories/scheduleRepository";
import { CreateScheduleDTO } from "./dtos/createScheduleDTO";
import { UpdateScheduleDTO } from "./dtos/updateScheduleDTO";

@Injectable()
export class SchedulesService {
  constructor(private repository: ScheduleRepository) {}
  async createClientSchedule(clientId: string, dto: CreateScheduleDTO) {
    const document = new ScheduleDocument();
    document.build(
      null,
      clientId,
      dto.timeInHours,
      dto.activityId,
      dto.activityDate,
      new Date()
    );
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
    document.build(
      id,
      dto.clientId,
      dto.timeInHours,
      dto.activityId,
      dto.activityDate,
      new Date()
    );
    let result;
    try {
      result = await this.repository.update(document);
    } catch (err) {
      throw new NotFoundException(err);
    }
    return result;
  }
}
