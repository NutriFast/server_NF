import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateActivityScheduleDTO {
  @ApiProperty({ example: "1.3" })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  duration: number;

  @ApiProperty({ example: "1.3" })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  freequency: number;

  @ApiProperty({ example: "296fd9a1-dfc2-4a8d-be1a-316b653a8b3d" })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  activityId: string;

  @ApiProperty({ example: "296fd9a1-dfc2-4a8d-be1a-316b653a8b3d" })
  @IsString()
  @IsOptional()
  @Type(() => String)
  scheduleId?: string;
}
