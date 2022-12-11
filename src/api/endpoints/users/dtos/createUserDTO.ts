import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Validate } from "class-validator";
import { IsRole } from "src/api/infrastructure/decorators/isRole.decorators";

export class CreateUserDTO {
  @ApiProperty({ example: "Gabriel Lima" })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  name: string;

  @ApiProperty({ example: "email@email.com" })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Type(() => String)
  email: string;

  @ApiProperty({ example: "senha123" })
  @Validate(IsRole)
  @IsNotEmpty()
  @Type(() => String)
  role: string;
}
