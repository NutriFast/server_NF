import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
