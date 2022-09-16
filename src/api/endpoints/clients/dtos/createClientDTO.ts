import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateClientDTO {

  @ApiProperty({ example: 'Gabriel Lima' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '1996-12-28T02:52:06.033Z' })
  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @ApiProperty({ example: 'Masculino'})
  @IsNotEmpty()
  gender: string;
}
