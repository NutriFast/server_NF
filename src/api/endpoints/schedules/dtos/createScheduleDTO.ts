import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";

export class CreateScheduleDTO {
  @ApiProperty({ example: "1996-12-28T02:52:06.033Z" })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  createdAt: Date;
}
