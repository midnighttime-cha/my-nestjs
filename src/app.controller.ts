import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { HelperService } from './shared/helpers/helper.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Get()
  async getHello(@Res() res) {
    const text = await this.appService.getHello();
    return await res.status(HttpStatus.OK).json({ text });
  }
}
