import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelperModule } from './shared/helpers/helper.module';

@Module({
  imports: [HelperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
