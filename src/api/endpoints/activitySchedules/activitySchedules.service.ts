import { Injectable } from "@nestjs/common";
import { schedule } from "firebase-functions/v1/pubsub";
import { ActivitiesScheduleDocument } from "src/api/infrastructure/documents/activitiesScheduleDocument";
import { ScheduleDocument } from "src/api/infrastructure/documents/scheduleDocument";
import { ActivitySchedulesRepository } from "src/api/infrastructure/repositories/activityScheduleRepository";
import { ScheduleRepository } from "src/api/infrastructure/repositories/scheduleRepository";
import { CreateActivityScheduleDTO } from "./dtos/createActivityScheduleDTO";

@Injectable()
export class ActivitySchedulesService {
  constructor(
    private repository: ActivitySchedulesRepository,
    private scheduleRepository: ScheduleRepository
  ) {}

  public async list() {
    return this.repository.findAll();
  }
  public async create(dto: CreateActivityScheduleDTO, clientId: string) {
    const document = new ActivitiesScheduleDocument();
    if (dto.scheduleId) {
      document.build(
        null,
        dto.duration,
        dto.freequency,
        dto.scheduleId,
        dto.activityId
      );
    } else {
      const scheduleDocument = new ScheduleDocument();
      scheduleDocument.build(null, clientId, new Date());
      const schedule = await this.scheduleRepository.create(scheduleDocument);
      document.build(
        null,
        dto.duration,
        dto.freequency,
        schedule.id,
        dto.activityId
      );
    }

    return this.repository.create(document);
  }
}
