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
import { JwtAuthGuard } from "src/api/infrastructure/guards/jwtAuth.guard";
import { RolesMiddleware } from "src/api/infrastructure/middlewares/roles.middleware";
import { CreateUserDTO } from "./dtos/createUserDTO";
import { UpdateUserDTO } from "./dtos/updateUserDTO";
import { UsersService } from "./users.service";

@Controller()
export class UsersController {
  constructor(private readonly service: UsersService, private rolesMiddleware: RolesMiddleware) {}
  private logger = new Logger(UsersController.name);

  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  async get(@Req() req,@Param("id") id: string) {
    this.logger.log(`GET -> /users/${id}`);
    await this.rolesMiddleware.isMaster(await this.service.get(req.user.userId));
    const result = this.service.get(id);
    return result;
  }
  @UseGuards(JwtAuthGuard)
  @Get("/:id/clients")
  async getClients(@Req() req,@Param("id") id: string) {
    this.logger.log(`GET -> /users/${id}/clients/`);
    await this.rolesMiddleware.isMaster(await this.service.get(req.user.userId));
    const result = this.service.getClients(id);
    return result;
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async list(@Req() req,@Query("name") name?: string) {
    this.logger.log("GET -> /users");
    await this.rolesMiddleware.isMaster(await this.service.get(req.user.userId))
    if (name) return this.service.getByName(name);
    const result = this.service.list();
    return result;
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req,@Body() dto: CreateUserDTO) {
    this.logger.log("POST -> /users");
    await this.rolesMiddleware.isMaster(await this.service.get(req.user.userId));
    const result = this.service.create(dto);
    return result;
  }
  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Req() req,@Body() dto: UpdateUserDTO) {
    this.logger.log("PATCH -> /users");
    await this.rolesMiddleware.isMaster(await this.service.get(req.user.userId));
    const result = this.service.update(dto);
    return result;
  }
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Req() req,@Body("id") id: string) {
    this.logger.log("DELETE -> /users");
    await this.rolesMiddleware.isMaster(await this.service.get(req.user.userId));
    const result = this.service.delete(id);
    return result;
  }
}
