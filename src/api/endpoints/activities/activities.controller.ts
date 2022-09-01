import { Controller, Delete, Get,Post,Patch, Logger} from "@nestjs/common";
import { ActivitiesService } from "./activities.service";

@Controller()

export class ActivitiesController {
    constructor(private readonly service: ActivitiesService) {}
  private logger = new Logger(ActivitiesController.name);

  @Get()
  async list(
  ) {
    this.logger.log('GET -> /activities')
    const result = this.service.list();
    return result;
  }
  @Post()
  async create(
  ) {
    this.logger.log('POST -> /activities')
    const result = this.service.create();
    return result;
  }
  @Patch()
  async update(
  ) {
    this.logger.log('PATCH -> /activities')
    const result = this.service.update();
    return result;
  }
  @Delete()
  async delete(
  ) {
    this.logger.log('DELETE -> /activities')
    const result = this.service.delete();
    return result;
  }
}
