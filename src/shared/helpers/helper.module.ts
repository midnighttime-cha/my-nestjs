import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { ConvertService } from './convert.service';
import { DatetimeService } from './datetime.service';
import { HelperService } from './helper.service';
import { ResponseService } from './response.service';

@Global()
@Module({
  providers: [ConvertService, DatetimeService, HelperService, ResponseService],
  exports: [DatetimeService, ConvertService, HelperService, ResponseService]
})
export class HelperModule { }
