import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UpdateClientDTO {
  @ApiProperty({ example: "296fd9a1-dfc2-4a8d-be1a-316b653a8b3d" })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: "Gabriel Lima" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: "296fd9a1-dfc2-4a8d-be1a-316b653a8b3d" })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: "1996-12-28T02:52:06.033Z" })
  @IsNotEmpty()
  @IsDate()
  birthDate: Date;

  @ApiProperty({ example: "Masculino" })
  @IsNotEmpty()
  gender: string;
}
