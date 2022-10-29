import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class UpdateActivityDTO {
  @ApiProperty({ example: "296fd9a1-dfc2-4a8d-be1a-316b653a8b3d" })
  @IsNotEmpty()
  id: string;

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
