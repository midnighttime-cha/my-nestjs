import { MailerService } from "@nestjs-modules/mailer";
import { HttpException, HttpStatus } from "@nestjs/common";
import { ConvertService } from "./convert.service";
import { EmailDTO } from "./dto/email.dto";

export class HelperService extends ConvertService {
  constructor(
    private readonly mailerService: MailerService
  ) {
    super();
  }

  async sendMail(email: EmailDTO) {
    try {
      return this.mailerService.sendMail(email);
    } catch (error) {
      throw new HttpException("email.send", HttpStatus.BAD_REQUEST);
    }
  }
}