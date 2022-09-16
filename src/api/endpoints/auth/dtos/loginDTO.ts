import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Validate } from "class-validator";
import { Roles } from "src/api/infrastructure/constants/roles";
import { IsRole } from "src/api/infrastructure/decorators/isRole.decorators";

export class LogInDTO {
  @ApiProperty({ example: 'username@email.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  username: string;

  @ApiProperty({ example: 'senha' })
  @IsNotEmpty()
  @IsString()
  password: string;

}
