import { Type } from "class-transformer";
import { IsDefined, IsEmail, IsNotEmpty, IsString, Validate } from "class-validator";
import { Roles } from "src/api/infrastructure/constants/roles";
import { IsRole } from "src/api/infrastructure/decorators/isRole.decorators";

export class UpdateUserDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
  
  @Validate(IsRole)
  @IsNotEmpty()
  role: Roles
}
