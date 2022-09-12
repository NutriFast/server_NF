import { IsNotEmpty, IsString } from "class-validator";

export class UpdateClientDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
