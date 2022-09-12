import { UUID } from "aws-sdk/clients/cloudtrail";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateActivityDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
