import { IsNotEmpty, IsString } from "class-validator";

export class CreateActivityDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
