import { Controller, Delete, Get,Post,Patch, Logger, Param, Body} from "@nestjs/common";
import { CreateUserDTO } from "./dtos/createUserDTO";
import { UpdateUserDTO } from "./dtos/updateUserDTO";
import { UsersService } from "./users.service";

@Controller()

export class UsersController {
    constructor(private readonly service: UsersService) {}
  private logger = new Logger(UsersController.name);

  @Get('/:id')
  async get(
    @Param('id') id: string,
  ) {
    this.logger.log(`GET -> /users/${id}`)
    const result = this.service.get(id);
    return 'result';
  }
  @Get()
  async list(
  ) {
    this.logger.log('GET -> /users')
    const result = await this.service.list();
    return result;
  }
  @Post()
  async create(
    @Body() dto: CreateUserDTO
  ) {
    this.logger.log('POST -> /users')
    const result = this.service.create(dto);
    return result;
  }
  @Patch()
  async update(
    @Body() dto: UpdateUserDTO
  ) {
    this.logger.log('PATCH -> /users')
    const result = this.service.update(dto);
    return result;
  }
  @Delete()
  async delete(
    @Body('id') id: string,
  ) {
    this.logger.log('DELETE -> /users')
    const result = this.service.delete(id);
    return result;
  }
}
