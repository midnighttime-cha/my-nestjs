import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { ConvertService } from './convert.service';
import { DatetimeService } from './datetime.service';
import { HelperService } from './helper.service';
import { ResponseData } from './response-data';

@Global()
@Module({
  providers: [ConvertService, DatetimeService, HelperService, ResponseData],
  exports: [DatetimeService, ConvertService, HelperService, ResponseData]
})
export class HelperModule { }
