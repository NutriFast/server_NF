import { UUID } from 'aws-sdk/clients/cloudtrail';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateActivityDTO {
  @IsNotEmpty()
  id: UUID

  @IsNotEmpty()
  @IsString()
  name: string;

}
