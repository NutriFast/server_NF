import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
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
    if(!result){
      result = []
    }
    result = await Promise.all(
      result.map((item) => {
        return this.getDBAndPT(item);
      })
    );
    let sumDB = 0;
    let sumPT = 0;
    result.forEach((item) => {
      sumDB += item.dailyBase;
      sumPT += item.parcialTime;
    });
    const TPR = (1440 - sumDB) * 1.5;
    let FAF = (sumPT + TPR) / 1440;
    FAF = Math.round(FAF * 100) / 100
    let AF;
    let status;
    const schedule = await this.scheduleRepository.getById(scheduleId);
    const client = await this.clientRepository.getById(schedule.clientId);
    const age = await this.getAge(client.birthDate)
    let GE;
    if (client.gender == "Masculino") {
      if (FAF < 1.4) {
        AF = 1.0;
        status = "Sedentário";
      }
      if (FAF >= 1.4 && FAF < 1.6) {
        AF = 1.11;
        status = "Pouco Ativo";
      }
      if (FAF >= 1.6 && FAF < 1.9) {
        AF = 1.25;
        status = "Ativo";
      }
      if (FAF >= 1.9) {
        AF = 1.48;
        status = "Muito Ativo";
      }
      if(AF) {
        if(age >= 3 && age <= 8) {
          GE = 88.5 - (61.9 * age) + (AF * ((26.7 * client.weight) + (903 * client.height) + 20))
        }
        if(age >= 9 && age <= 18) {
          GE = 88.5 - (61.9 * age) + (AF * ((26.7 * client.weight) + (903 * client.height) + 25))
        }
        if(age >= 19) {
          GE = 662 - (9.53 * age) + (AF * ((15.91 * client.weight) + (539.6 * client.height)))
        }
  
      }
        
    } else {
      if (FAF >= 1 && FAF < 1.4) {
        AF = 1.0;
        status = "Sedentário";
      }
      if (FAF >= 1.4 && FAF < 1.6) {
        AF = 1.12;
        status = "Pouco Ativo";
      }
      if (FAF >= 1.6 && FAF < 1.9) {
        AF = 1.27;
        status = "Ativo";
      }
      if (FAF >= 1.9 && FAF < 2.5) {
        AF = 1.45;
        status = "Muito Ativo";
      }
      if(age >= 3 && age <= 8) {
        GE = 135.3 - (30.8 * age) + (AF * ((10 * client.weight) + (934 * client.height) + 20))
      }
      if(age >= 9 && age <= 18) {
        GE = 135.3 - (30.8 * age) + (AF * ((10 * client.weight) + (934 * client.height) + 25))
      }
      if(age >= 19) {
        GE = 354 - (6.91 * age) + (AF * ((9.36 * client.weight) + (726 * client.height)))
      }
    }
    GE = Math.round(GE * 100) / 100
    const payload = {
      result,
      sumDB,
      sumPT,
      TPR,
      FAF,
      AF,
      status,
      GE,
    };
    console.log(payload)
    return payload;
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
  private async getDBAndPT(item: ActivitiesScheduleDocument) {
    item.dailyBase = (item.freequency * 60 * item.duration) / 7;
    const activity = await this.activityRepository.getById(item.activityId);
    if(!activity) {
      console.log(`failed to find activityId: ${item.activityId}`)
      throw new BadRequestException(`failed to find activityId: ${item.activityId}`)
    }
    item.parcialTime = activity.value * item.dailyBase;
    return item;
  }

  public async delete(id:string) {
    return this.repository.deleteById(id);
  }

  private getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
}
