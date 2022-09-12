import { IsNotEmpty, IsString } from "class-validator";

export class UpdateActivityDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
