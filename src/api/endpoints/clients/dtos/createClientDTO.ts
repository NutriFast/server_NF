import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateClientDTO {
  @ApiProperty({ example: "Gabriel Lima" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: "1996-12-28T02:52:06.033Z" })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  birthDate: Date;

  @ApiProperty({ example: "80.6" })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  weight: number;

  @ApiProperty({ example: "1.97" })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  height: number;

  @ApiProperty({ example: "+5506199595959" })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  phone: string;

  @ApiProperty({ example: "296fd9a1-dfc2-4a8d-be1a-316b653a8b3d" })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  userId: string;

  @ApiProperty({ example: "Masculino" })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  gender: string;
}
