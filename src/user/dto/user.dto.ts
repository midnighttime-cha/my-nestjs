import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
  @ApiProperty() username: string;
  @ApiProperty() password: string;
  @ApiProperty() firstNameTH: string;
  @ApiProperty() lastNameTH: string;
  @ApiProperty() firstNameEN: string;
  @ApiProperty() lastNameEN: string;
  @ApiProperty() email: string;
  @ApiProperty({ required: false }) phoneNo: string;
  @ApiProperty({ required: false }) mobileNo: string;
}

export class UpdateUserDTO {
  @ApiProperty() username: string;
  @ApiProperty({ required: false }) password: string;
  @ApiProperty() firstNameTH: string;
  @ApiProperty() lastNameTH: string;
  @ApiProperty() firstNameEN: string;
  @ApiProperty() lastNameEN: string;
  @ApiProperty() email: string;
  @ApiProperty({ required: false }) phoneNo: string;
  @ApiProperty({ required: false }) mobileNo: string;
}