import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/api/infrastructure/guards/jwtAuth.guard";
import { ClientsService } from "../clients/clients.service";
import { CreateScheduleDTO } from "./dtos/createScheduleDTO";
import { UpdateScheduleDTO } from "./dtos/updateScheduleDTO";
import { SchedulesService } from "./schedule.service";
@ApiTags("Schedule")
@Controller()
export class SchedulesController {
  constructor(
    private readonly service: SchedulesService,
    private clientService: ClientsService
  ) {}
  private logger = new Logger(SchedulesController.name);

  @ApiHeader({ name: "Authorization", required: true })
  @ApiOperation({
    description: "This endpoint create a acitivity on a Client schedule",
  })
  @UseGuards(JwtAuthGuard)
  @Post("/client/:clientId")
  async create(
    @Req() req,
    @Param("clientId") clientId: string,
    @Body() dto: CreateScheduleDTO
  ) {
    this.logger.log(`POST -> /schedules/${clientId}`);
    const result = await this.service.createClientSchedule(clientId, dto);
    return result;
  }

  @ApiHeader({ name: "Authorization", required: true })
  @ApiOperation({ description: "This endpoint get a Client Schedule" })
  @UseGuards(JwtAuthGuard)
  @Get("/client/:clientId")
  async getByClient(@Req() req, @Param("clientId") clientId: string) {
    this.logger.log(`GET -> /schedules/${clientId}`);
    const result = await this.service.getByClientId(clientId);
    return result;
  }
  @ApiHeader({ name: "Authorization", required: true })
  @ApiOperation({ description: "This endpoint get a Client Schedule time sum" })
  @UseGuards(JwtAuthGuard)
  @Get("/client/:clientId/info")
  async getByClientScheduleInfo(
    @Req() req,
    @Param("clientId") clientId: string
  ) {
    this.logger.log(`GET -> /schedules/${clientId}/info`);
    const result = await this.service.getByClientId(clientId);
    let sumExerciseTime = 0;
    result.forEach((activityDone) => {
      sumExerciseTime = sumExerciseTime + activityDone.timeInHours;
    });
    return {
      sumExerciseTime: sumExerciseTime,
    };
  }
  @ApiHeader({ name: "Authorization", required: true })
  @ApiOperation({
    description: "This endpoint delete a acitivity on a Client schedule",
  })
  @UseGuards(JwtAuthGuard)
  @Delete("/:id")
  async delete(@Req() req, @Param("id") id: string) {
    this.logger.log(`DELETE -> /schedules/${id}`);
    const result = await this.service.delete(id);
    return result;
  }
  @ApiHeader({ name: "Authorization", required: true })
  @ApiOperation({
    description: "This endpoint update a acitivity on a Client schedule",
  })
  @UseGuards(JwtAuthGuard)
  @Patch("/:id")
  async update(
    @Req() req,
    @Param("id") id: string,
    @Body() dto: UpdateScheduleDTO
  ) {
    this.logger.log(`PATCH -> /schedules/${id}`);
    const result = await this.service.update(dto, id);
    return result;
  }
}
