import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/api/infrastructure/guards/jwtAuth.guard";
import { ClientsService } from "./clients.service";
import { CreateClientDTO } from "./dtos/createClientDTO";
import { UpdateClientDTO } from "./dtos/updateClientDTO";

@Controller()
export class ClientsController {
  constructor(private readonly service: ClientsService) {}
  private logger = new Logger(ClientsController.name);
  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  async get(@Request() req, @Param("id") id: string) {
    this.logger.log(`GET -> /clients/${id}`);
    const result = await this.service.getClientByUserId(req.user.userId);
    if (id) result.filter((client) => client.id == id);

    return result;
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async list(@Request() req, @Query("name") name?: string) {
    this.logger.log("GET -> /clients");
    const result = await this.service.getClientByUserId(req.user.userId);
    if (name) result.filter((client) => client.name == name);
    return result;
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() dto: CreateClientDTO) {
    this.logger.log("POST -> /clients");
    const result = this.service.create(dto, req.user.userId);
    return result;
  }
  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() dto: UpdateClientDTO) {
    this.logger.log("PATCH -> /clients");
    const client = await this.service.get(dto.id);
    if (client) return this.service.update(dto);
    throw new NotFoundException("Client not found");
  }
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Body("id") id: string) {
    this.logger.log("DELETE -> /clients");
    const client = await this.service.get(id);
    if (client) return this.service.delete(id);
    throw new NotFoundException("Client not found");
  }
}
