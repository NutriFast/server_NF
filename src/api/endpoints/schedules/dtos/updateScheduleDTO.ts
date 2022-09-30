import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from "class-validator";

export class UpdateScheduleDTO {
  @ApiProperty({ example: "296fd9a1-dfc2-4a8d-be1a-316b653a8b3d" })
  @IsNotEmpty()
  @IsString()
  activityId: string;

  @ApiProperty({ example: "296fd9a1-dfc2-4a8d-be1a-316b653a8b3d" })
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @ApiProperty({ example: "1.5" })
  @IsNumber()
  timeInHours: number;

  @ApiProperty({ example: "1996-12-28T02:52:06.033Z" })
  @IsNotEmpty()
  @IsDateString()
  activityDate: string;
}
