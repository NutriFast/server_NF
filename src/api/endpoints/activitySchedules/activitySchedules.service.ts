import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { rejects } from "assert";
import { resolve } from "path";
import { ActivitiesScheduleDocument } from "src/api/infrastructure/documents/activitiesScheduleDocument";
import { ScheduleDocument } from "src/api/infrastructure/documents/scheduleDocument";
import { ActivityRepository } from "src/api/infrastructure/repositories/activityRepository";
import { ActivitySchedulesRepository } from "src/api/infrastructure/repositories/activityScheduleRepository";
import { ClientRepository } from "src/api/infrastructure/repositories/clientRepository";
import { ScheduleRepository } from "src/api/infrastructure/repositories/scheduleRepository";
import { CreateActivityScheduleDTO } from "./dtos/createActivityScheduleDTO";

@Injectable()
export class ActivitySchedulesService {
  constructor(
    private repository: ActivitySchedulesRepository,
    private scheduleRepository: ScheduleRepository,
    private activityRepository: ActivityRepository,
    private clientRepository: ClientRepository
  ) {}

  public async list() {
    return this.repository.findAll();
  }

  public async get(scheduleId: string) {
    let result;
    try {
      result = await this.repository.getByScheduleId(scheduleId);
    } catch (err) {
      throw new NotFoundException(err);
    }
    result = await Promise.all(result.map((item) => {
      return this.getDBAndPT(item)
    }))
    let sumDB = 0
    let sumPT = 0
    result.forEach(item => {
      sumDB += item.dailyBase;
      sumPT += item.parcialTime;
    });
    const TPR = (1440 - sumDB) * 1.5
    const FAF = sumPT + TPR / 1440
    let AF;
    let status;
    const schedule = await this.scheduleRepository.getById(scheduleId);
    const client = await this.clientRepository.getById(schedule.clientId);
    if(client.gender == 'Masculino') {
      if(FAF >= 1 && FAF < 1.4) {
        AF = 1.0
        status = "Sedentário"
      }
      if(FAF >= 1.4 && FAF < 1.6) {
        AF = 1.11
        status = "Pouco Ativo"
      }
      if(FAF >= 1.6 && FAF < 1.9) {
        AF = 1.25
        status = "Ativo"
      }
      if(FAF >= 1.9 && FAF < 2.5) {
        AF = 1.48
        status = "Muito Ativo"
      }
    } else {
      if(FAF >= 1 && FAF < 1.4) {
        AF = 1.0
        status = "Sedentário"
      }
      if(FAF >= 1.4 && FAF < 1.6) {
        AF = 1.12
        status = "Pouco Ativo"
      }
      if(FAF >= 1.6 && FAF < 1.9) {
        AF = 1.27
        status = "Ativo"
      }
      if(FAF >= 1.9 && FAF < 2.5) {
        AF = 1.45
        status = "Muito Ativo"
      }
    }
    const payload = {
      result,
      sumDB,
      sumPT,
      TPR,
      FAF,
      AF,
      status
    }
    return payload
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
  private async getDBAndPT(item:ActivitiesScheduleDocument){
    item.dailyBase = (item.freequency * item.duration) / 7
    const activity = await this.activityRepository.getById(item.activityId);
    item.parcialTime = (activity.value * item.dailyBase);
    return item
  }
}
