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
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ErroMessage } from "src/api/infrastructure/enums/erroMessages..enum";
import { JwtAuthGuard } from "src/api/infrastructure/guards/jwtAuth.guard";
import { ClientsService } from "./clients.service";
import { CreateClientDTO } from "./dtos/createClientDTO";
import { UpdateClientDTO } from "./dtos/updateClientDTO";
@ApiTags("Clients")
@Controller()
export class ClientsController {
  constructor(private readonly service: ClientsService) {}
  private logger = new Logger(ClientsController.name);

  @ApiHeader({ name: "Authorization", required: true })
  @ApiOperation({ description: "This endpoint returns a client by its id" })
  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  async get(@Req() req, @Param("id") id: string) {
    this.logger.log(`GET -> /clients/${id}`);
    const result = await this.service.getClientByUserId(req.user.userId);
    if (id) result.filter((client) => client.id == id);

    return result;
  }

  @ApiHeader({ name: "Authorization", required: true })
  @ApiOperation({ description: "This endpoint returns all client" })
  @UseGuards(JwtAuthGuard)
  @Get()
  async list(@Req() req, @Query("name") name?: string | undefined) {
    this.logger.log("GET -> /clients");
    const result = await this.service.getClientByUserId(req.user.userId);
    if (name) return result.filter((client) => client.name.indexOf(name) != -1);
    return result;
  }

  @ApiHeader({ name: "Authorization", required: true })
  @ApiOperation({ description: "This endpoint create a client" })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() dto: CreateClientDTO) {
    this.logger.log("POST -> /clients");
    return this.service.create(dto, req.user.userId);
  }

  @ApiHeader({ name: "Authorization", required: true })
  @ApiOperation({ description: "This endpoint edit a client by its id" })
  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() dto: UpdateClientDTO) {
    this.logger.log("PATCH -> /clients");
    const client = await this.service.get(dto.id);
    if (client) return this.service.update(dto);
    throw new NotFoundException("Client not found");
  }

  @ApiHeader({ name: "Authorization", required: true })
  @ApiOperation({ description: "This endpoint delete a client by its id" })
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Body("id") id: string) {
    this.logger.log("DELETE -> /clients");
    const client = await this.service.get(id);
    if (client) return this.service.delete(id);
    throw new NotFoundException(`client-${ErroMessage.notFound}`);
  }
}
