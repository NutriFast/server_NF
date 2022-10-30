import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from "class-validator";

export class CreateActivityDTO {
  @ApiProperty({ example: "Futebol" })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  name: string;

  @ApiProperty({ example: "30" })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  value: number;
}
