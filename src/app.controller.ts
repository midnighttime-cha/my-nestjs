import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailDTO } from './shared/helpers/dto/email.dto';
import { HelperService } from './shared/helpers/helper.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly helperService: HelperService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('sendEmail')
  async sendEmail(@Body() email: EmailDTO, @Res() res) {
    const responseData = await this.helperService.sendMails(email);
    return await res.status(HttpStatus.OK).json(responseData);
  }
}
