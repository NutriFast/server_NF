import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/api/infrastructure/guards/jwtAuth.guard";
import { ActivitySchedulesService } from "./activitySchedules.service";
import { CreateActivityScheduleDTO } from "./dtos/createActivityScheduleDTO";

@ApiTags("ActivitySchedules")
@Controller()
export class ActivitySchedulesController {
  constructor(private readonly service: ActivitySchedulesService) {}
  private logger = new Logger(ActivitySchedulesController.name);

  @ApiHeader({ name: "Authorization", required: true })
  @ApiOperation({ description: "This endpoint returns a activity by its name" })
  @UseGuards(JwtAuthGuard)
  @Get()
  async list(@Req() req) {
    this.logger.log("GET -> /activitySchedules");
    return this.service.list();
  }
  @ApiHeader({ name: "Authorization", required: true })
  @ApiOperation({ description: "This endpoint will create a activity" })
  @UseGuards(JwtAuthGuard)
  @Post("/client/:clientId")
  async create(
    @Req() req,
    @Param("clientId") clientId: string,
    @Body() dto: CreateActivityScheduleDTO
  ) {
    this.logger.log("POST -> /activities");
    return this.service.create(dto, clientId);
  }
}
