import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/api/infrastructure/middlewares/jwtAuth.guard";
import { ClientsService } from "./clients.service";
import { CreateClientDTO } from "./dtos/createClientDTO";
import { UpdateClientDTO } from "./dtos/updateClientDTO";

@Controller()
export class ClientsController {
  constructor(private readonly service: ClientsService) {}
  private logger = new Logger(ClientsController.name);

  @Get("/:id")
  async get(@Param("id") id: string) {
    this.logger.log(`GET -> /clients/${id}`);
    const result = this.service.get(id);
    return result;
  }
  @Get("/users/:userId")
  async getClientByUserId(@Param("userId") userId: string) {
    this.logger.log("GET -> /clients");
    const result = this.service.getClientByUserId(userId);
    return result;
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async list(@Request() req,@Query("name") name?: string) {
    this.logger.log("GET -> /clients");
    if (name) return this.service.getByName(name);
    const result = this.service.list();
    return result;
  }
  @Post()
  async create(@Body() dto: CreateClientDTO) {
    this.logger.log("POST -> /clients");
    const result = this.service.create(dto);
    return result;
  }
  @Patch()
  async update(@Body() dto: UpdateClientDTO) {
    this.logger.log("PATCH -> /clients");
    const result = this.service.update(dto);
    return result;
  }
  @Delete()
  async delete(@Body("id") id: string) {
    this.logger.log("DELETE -> /clients");
    const result = this.service.delete(id);
    return result;
  }
}
