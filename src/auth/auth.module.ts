import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: `${process.env.APP_SECRET}`,
      publicKey: `${process.env.APP_PUBLIC_KEY}`,
      privateKey: `${process.env.APP_PRIVATE_KEY}`,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
