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
  UseGuards,
  Req,
} from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/api/infrastructure/guards/jwtAuth.guard";
import { RolesMiddleware } from "src/api/infrastructure/middlewares/roles.middleware";
import { CreateActivityDTO } from "../activities/dtos/createActivityDTO";
import { UpdateActivityDTO } from "../activities/dtos/updateActivityDTO";
import { UsersService } from "../users/users.service";
import { ActivitiesService } from "./activities.service";
@ApiTags('Activities')
@Controller()
export class ActivitiesController {
  constructor(private readonly service: ActivitiesService, private userService: UsersService, private rolesMiddleware: RolesMiddleware) {}
  private logger = new Logger(ActivitiesController.name);

  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ description: 'This endpoint returns a activity by its id' })
  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  async get(@Req() req,@Param("id") id: string) {
    this.logger.log(`GET -> /activities/${id}`);
    await this.rolesMiddleware.isMaster(await this.userService.get(req.user.userId));
    const result = this.service.get(id);
    return result;
  }
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ description: 'This endpoint returns a activity by its name' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async list(@Req() req,@Query("name") name?: string) {
    this.logger.log("GET -> /activities");
    await this.rolesMiddleware.isMaster(await this.userService.get(req.user.userId));
    if (name) return this.service.getByName(name);
    const result = this.service.list();
    return result;
  }
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ description: 'This endpoint will create a activity' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req,@Body() dto: CreateActivityDTO) {
    this.logger.log("POST -> /activities");
    await this.rolesMiddleware.isMaster(await this.userService.get(req.user.userId));
    const result = this.service.create(dto);
    return result;
  }
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ description: 'This endpoint will edit a activity' })
  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Req() req,@Body() dto: UpdateActivityDTO) {
    this.logger.log("PATCH -> /activities");
    await this.rolesMiddleware.isMaster(await this.userService.get(req.user.userId));
    const result = this.service.update(dto);
    return result;
  }
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ description: 'This endpoint will delete a activity' })
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Req() req,@Body("id") id: string) {
    this.logger.log("DELETE -> /activities");
    await this.rolesMiddleware.isMaster(await this.userService.get(req.user.userId));
    const result = this.service.delete(id);
    return result;
  }
}
