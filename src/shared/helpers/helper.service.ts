import { MailerService } from "@nestjs-modules/mailer";
import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import { ConvertService } from "./convert.service";
import { EmailDTO } from "./dto/email.dto";

export class HelperService extends ConvertService {
  constructor(
    private readonly mailerService: MailerService
  ) {
    super();
  }

  async sendMails(email: EmailDTO) {
    try {
      Logger.log(email, "email")
      return this.mailerService.sendMail(email);
    } catch (error) {
      throw new HttpException(`helper.send.email: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}