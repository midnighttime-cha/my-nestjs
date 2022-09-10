import { NestFactory } from '@nestjs/core';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
const bodyParser = require('body-parser');
// import * as compression from 'compression';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const port = process.env.API_PORT;
const pjson = require('../package.json');

async function bootstrap() {
  //ตั้งค่าให้ NestJS ใช้ Express Platform
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());

  // ตั้งค่า CORS
  app.enableCors({
    origin: true,
    methods: 'POST, GET, PUT, PATCH, DELETE, OPTIONS',
    credentials: true,
  });

  // ตั้งค่า Body Parser
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // (Optional) ใช้กรณีไม่ได้เรียก API ผ่าน NGINX
  // app.use(compression());

  app.setGlobalPrefix('v1');

  const swaggerCustomOptions = {
    swaggerOptions: { docExpansion: 'list', defaultModelsExpandDepth: -1, filter: true },
  };
  const setVersion = pjson.version;

  const options = new DocumentBuilder()
    .addServer(`${process.env.API_HOST}`, `[${process.env.API_SERVTYPE}] API My NestJS`) // Set server url
    .setTitle('My NestJS API') // Set api title
    .setDescription('The My NestJS API description') // Set api description
    .setVersion(setVersion) // Set api version
    .addBearerAuth() // Set api authentication type
    .setContact('My NestJS', `${process.env.API_HOST}`, `${process.env.API_EMAIL}`) // Set api contact to developer or staff
    .addTag('Authentication & Access') // Set api default tags.
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document, swaggerCustomOptions);

  await app.listen(port);
  await Logger.log("==============================")
  await Logger.log(`Server running on [${process.env.API_SERVTYPE}] : ${await app.getUrl()}`, 'Bootstrap');
  await Logger.log("==============================")
}
bootstrap();

