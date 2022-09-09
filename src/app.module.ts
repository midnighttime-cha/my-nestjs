import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './shared/email/email.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [EmailModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
