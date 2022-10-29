import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  Validate,
} from "class-validator";
import { IsRole } from "src/api/infrastructure/decorators/isRole.decorators";

export class UpdateUserDTO {
  @ApiProperty({ example: "296fd9a1-dfc2-4a8d-be1a-316b653a8b3d" })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: "Gabriel Lima" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: "email@email.com" })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: "senha123" })
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password: string;

  @ApiProperty({ example: "Normal" })
  @Validate(IsRole)
  @IsNotEmpty()
  role: string;
}
