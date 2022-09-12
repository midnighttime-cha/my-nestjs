import { ApiProperty } from "@nestjs/swagger";
import { DatetimeService } from "../helpers/datetime.service";
const dt = new DatetimeService();

export class CreateEditorDTO {
  @ApiProperty() createBy: number;
  @ApiProperty() modifyBy: number;
  @ApiProperty({ default: dt.dateNow() }) createAt: Date;
  @ApiProperty({ default: dt.dateNow() }) modifyAt: Date;
}

export class UpdateEditorDTO {
  @ApiProperty() modifyBy: number;
  @ApiProperty({ default: dt.dateNow() }) modifyAt: Date;
}