import { Type } from "class-transformer";
import { IsNotEmpty, IsString, Validate } from "class-validator";
import { Roles } from "src/api/infrastructure/constants/roles";
import { IsRole } from "src/api/infrastructure/decorators/isRole.decorators";

export class SignInDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
  
}
