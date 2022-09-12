import { Body, Controller, Get, HttpStatus, Logger, Post, Query, Req, Res, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/shared/pipe/validation.pipe';
import { ResponseService } from 'src/shared/helpers/response.service';
import { CreateUserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { MyLogger } from 'src/shared/logger/logger.service';
import { DatetimeService } from 'src/shared/helpers/datetime.service';
import { HelperService } from 'src/shared/helpers/helper.service';

@ApiTags("User")
@Controller('user')
export class UserController extends HelperService {
  constructor(
    private readonly userServices: UserService,
    private readonly resdata: ResponseService
  ) { super() }

  @Get()
  @ApiOperation({ summary: "เรียกดูข้อมูลทั้งหมด" })
  @ApiQuery({ name: "username" })
  // @ApiBearerAuth()
  // @UseGuards(new AuthGaurd())
  async findData(@Res() res, @Req() req, @Query() query) {
    const responseData = await this.userServices.findUserOne(query.username);
    return await this.resdata.responseFindOneSuccess(req, res, responseData);
  }


  // Method POST
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Req() req, @Res() res, @Body() data: CreateUserDTO) {
    Logger.log(data, "data");
    const responseData = await this.userServices.createUser(data, "AM",);

    // return this.resdata.responseFindOneSuccess(req, res, responseData);
  }
}
