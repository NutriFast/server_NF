import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
} from "class-validator";
import { Roles } from "src/api/infrastructure/constants/roles";
import { IsRole } from "src/api/infrastructure/decorators/isRole.decorators";

export class CreateUserDTO {

  @ApiProperty({ example: "email@email.com" })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password: string;

  @ApiProperty({ example: "senha123" })
  @Validate(IsRole)
  @IsNotEmpty()
  role: Roles;
}
