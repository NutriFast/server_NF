import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export class CreateScheduleDTO {
  @ApiProperty({ example: "296fd9a1-dfc2-4a8d-be1a-316b653a8b3d" })
  @IsNotEmpty()
  @IsString()
  activityId: string;

  @ApiProperty({ example: "1.5" })
  @IsNumber()
  timeInHours: number;

  @IsNotEmpty()
  @IsDateString()
  activityDate: string;
}
