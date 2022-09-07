import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { ConvertService } from './convert.service';
import { DatetimeService } from './datetime.service';
import { HelperService } from './helper.service';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: parseInt(`${process.env.SMTP_PORT}`),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      }
    })
  ],
  providers: [ConvertService, DatetimeService, HelperService],
  exports: [DatetimeService, ConvertService, HelperService]
})
export class HelperModule { }
