import { ApiProperty } from '@nestjs/swagger';

export class UserAuthDTO {
  @ApiProperty() username: string;
  @ApiProperty() password: string;
}
