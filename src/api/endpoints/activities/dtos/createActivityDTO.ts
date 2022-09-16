import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateActivityDTO {
  @ApiProperty({ example: 'Futebol' }) 
  @IsNotEmpty()
  @IsString()
  name: string;
}
