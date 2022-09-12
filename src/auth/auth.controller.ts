import { Controller, Post, Req, Res, Body, HttpException, HttpStatus, Headers, UsePipes, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseService } from 'src/shared/helpers/response.service';
import { UserAuthDTO } from 'src/user/dto/user-auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Authentication & Access')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly resdata: ResponseService
  ) { }

  @Post('verify')
  async login(@Req() req, @Res() res, @Body() body: UserAuthDTO) {
    const items = await this.authService.validateUser(body.username, body.password);
    return this.resdata.responseAuthSuccess(req, res, items);
  }
}
