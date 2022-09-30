import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class SignInDTO {
  @ApiProperty({ example: "Gabriel" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: "email@email.com" })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: "senha123" })
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password: string;
}
