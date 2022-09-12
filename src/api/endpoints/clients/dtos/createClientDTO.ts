import { IsNotEmpty, IsString } from "class-validator";

export class CreateClientDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
