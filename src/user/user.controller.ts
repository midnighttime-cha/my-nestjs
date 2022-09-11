import { Body, Controller, Logger, Post, Req, Res, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/shared/pipe/validation.pipe';
import { ResponseData } from 'src/shared/helpers/response-data';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';

@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(
    private readonly userServices: UserService,
    private readonly resdata: ResponseData
  ) {
  }

  // Method POST
  @Post('register')
  // @UsePipes(new ValidationPipe())
  async register(@Req() req, @Res() res, @Body() data: UserDTO) {
    Logger.log(data, "data");
    const responseData = await this.userServices.register(data);
    Logger.log(responseData, "responseData");
    return this.resdata.responseFindOneSuccess(req, res, responseData);
  }
}
