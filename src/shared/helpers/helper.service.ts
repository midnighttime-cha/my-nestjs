import { MailerService } from "@nestjs-modules/mailer";
import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import { ConvertService } from "./convert.service";
import { EmailDTO } from "../email/dto/email.dto";

export class HelperService extends ConvertService {
  constructor() {
    super();
  }
}