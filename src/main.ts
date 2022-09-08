import { NestFactory } from '@nestjs/core';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
const bodyParser = require('body-parser');
const port = process.env.API_PORT;

async function bootstrap() {
  //ตั้งค่าให้ NestJS ใช้ Express Platform
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());

  // ตั้งค่า CORS
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(port);
}
bootstrap();
