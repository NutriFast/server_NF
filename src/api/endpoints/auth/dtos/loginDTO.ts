import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class LogInDTO {
  @ApiProperty({ example: "username@email.com" })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  username: string;

  @ApiProperty({ example: "senha" })
  @IsNotEmpty()
  @IsString()
  password: string;
}
