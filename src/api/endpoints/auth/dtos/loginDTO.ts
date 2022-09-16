import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Validate } from "class-validator";
import { Roles } from "src/api/infrastructure/constants/roles";
import { IsRole } from "src/api/infrastructure/decorators/isRole.decorators";

export class LogInDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

}
