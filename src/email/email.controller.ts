import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailDTO } from './dto/email.dto';
import { EmailService } from './email.service';

@ApiTags("Email")
@Controller('email')
export class EmailController {
  constructor(
    private readonly emailServices: EmailService
  ) { }

  @Post('send')
  async sendEmail(@Body() email: EmailDTO, @Res() res) {
    try {
      const responseData = await this.emailServices.sendMails(email);
      return await res.status(HttpStatus.OK).json(responseData);
    } catch (error) {
      throw new HttpException(`email.send: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
