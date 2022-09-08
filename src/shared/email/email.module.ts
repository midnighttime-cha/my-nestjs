import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [
    //Use for Hotmail SMTP
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: parseInt(`${process.env.SMTP_PORT}`),
        secureConnection: false,
        tls: {
          ciphers: 'SSLv3'
        },
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      }
    }),
    // Use other smtp without gmail
    // MailerModule.forRoot({
    //   transport: {
    //     host: process.env.SMTP_HOST,
    //     port: parseInt(`${process.env.SMTP_PORT}`),
    //     auth: {
    //       user: process.env.SMTP_USER,
    //       pass: process.env.SMTP_PASS
    //     }
    //   }
    // })
  ],
  controllers: [EmailController],
  providers: [EmailService]
})
export class EmailModule { }
