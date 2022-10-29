import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class UpdateScheduleDTO {
  @ApiProperty({ example: "296fd9a1-dfc2-4a8d-be1a-316b653a8b3d" })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ example: "296fd9a1-dfc2-4a8d-be1a-316b653a8b3d" })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  clientId: string;

  @ApiProperty({ example: "1996-12-28T02:52:06.033Z" })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  createdAt: Date;
}
