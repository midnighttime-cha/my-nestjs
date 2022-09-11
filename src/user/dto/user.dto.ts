import { ApiProperty } from "@nestjs/swagger";

export class UserDTO {
  @ApiProperty() username: string;
  @ApiProperty() password: string;
  @ApiProperty() firstNameTH: string;
  @ApiProperty() lastNameTH: string;
  @ApiProperty() email: string;
  @ApiProperty({ required: false }) phoneNo: string;
  @ApiProperty({ required: false }) mobileNo: string;
}