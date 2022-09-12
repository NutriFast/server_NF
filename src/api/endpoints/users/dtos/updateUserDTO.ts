import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password_hash: string;
}
