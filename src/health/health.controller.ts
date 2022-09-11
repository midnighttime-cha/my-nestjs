import { Controller, Get, HttpException, HttpStatus, Logger, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';

@ApiTags("Health")
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) { }

  @Get()
  @HealthCheck()
  async check(@Res() res) {
    try {
      const responseData = await this.health.check([
        () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
      ]);
      return await res.status(HttpStatus.OK).json(responseData);
    } catch (error) {
      throw new HttpException(`HealthCheck: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
