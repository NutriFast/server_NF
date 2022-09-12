import {
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Logger,
  Param,
  Body,
  Query,
} from "@nestjs/common";
import { CreateActivityDTO } from "../activities/dtos/createActivityDTO";
import { UpdateActivityDTO } from "../activities/dtos/updateActivityDTO";
import { ActivitiesService } from "./activities.service";

@Controller()
export class ActivitiesController {
  constructor(private readonly service: ActivitiesService) {}
  private logger = new Logger(ActivitiesController.name);

  @Get("/:id")
  async get(@Param("id") id: string) {
    this.logger.log(`GET -> /activities/${id}`);
    const result = this.service.get(id);
    return result;
  }
  @Get()
  async list(@Query("name") name?: string) {
    this.logger.log("GET -> /activities");
    if (name) return this.service.getByName(name);
    const result = this.service.list();
    return result;
  }
  @Post()
  async create(@Body() dto: CreateActivityDTO) {
    this.logger.log("POST -> /activities");
    const result = this.service.create(dto);
    return result;
  }
  @Patch()
  async update(@Body() dto: UpdateActivityDTO) {
    this.logger.log("PATCH -> /activities");
    const result = this.service.update(dto);
    return result;
  }
  @Delete()
  async delete(@Body("id") id: string) {
    this.logger.log("DELETE -> /activities");
    const result = this.service.delete(id);
    return result;
  }
}
