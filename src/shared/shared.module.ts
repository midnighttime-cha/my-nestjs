import { Module } from '@nestjs/common';
import { HelperModule } from './helpers/helper.module';

@Module({
  imports: [
    HelperModule
  ]
})
export class SharedModule { }
