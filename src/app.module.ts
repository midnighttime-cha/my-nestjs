import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelperModule } from './shared/helpers/helper.module';
import { EmailModule } from './shared/email/email.module';

@Module({
  imports: [HelperModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
