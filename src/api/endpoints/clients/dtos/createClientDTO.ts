import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateClientDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @IsNotEmpty()
  gender: string;
}
