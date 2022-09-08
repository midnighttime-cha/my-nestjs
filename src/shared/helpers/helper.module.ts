import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { ConvertService } from './convert.service';
import { DatetimeService } from './datetime.service';
import { HelperService } from './helper.service';

@Global()
@Module({
  providers: [ConvertService, DatetimeService, HelperService],
  exports: [DatetimeService, ConvertService, HelperService]
})
export class HelperModule { }
