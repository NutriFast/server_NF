import { UUID } from 'aws-sdk/clients/cloudtrail';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  id: UUID

  @IsNotEmpty()
  @IsString()
  name: string;

}
