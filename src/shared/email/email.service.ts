import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmailDTO } from './dto/email.dto';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService
  ) { }

  async sendMails(email: EmailDTO) {
    try {
      return this.mailerService.sendMail(email);
    } catch (error) {
      throw new HttpException(`helper.send.email: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

}
