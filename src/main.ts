import { NestFactory } from '@nestjs/core';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
const bodyParser = require('body-parser');
// import * as compression from 'compression';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MyLogger } from './shared/logger/logger.service';

const port = process.env.API_PORT; // Declare api port
const pjson = require('../package.json'); // get api version from package.json

async function bootstrap() {
  const setVersion = pjson.version; // API version

  //ตั้งค่าให้ NestJS ใช้ Express Platform
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), {
    logger: new MyLogger(),
  });

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

  // Set global prefix
  app.setGlobalPrefix('v1');

  // Set Swagger
  // Swagger option
  const swaggerCustomOptions = {
    swaggerOptions: { docExpansion: 'list', defaultModelsExpandDepth: -1, filter: true },
  };

  // swagger builder
  const options = new DocumentBuilder()
    .addServer(`${process.env.API_HOST}`, `[${process.env.API_SERVTYPE}] API My NestJS`) // Set server url
    .setTitle('My NestJS API') // Set api title
    .setDescription('The My NestJS API description') // Set api description
    .setVersion(setVersion) // Set api version
    .addBearerAuth() // Set api authentication type
    .setContact('My NestJS', `${process.env.API_HOST}`, `${process.env.API_EMAIL}`) // Set api contact to developer or staff
    .addTag('Authentication & Access') // Set api default tags.
    .build();

  // create swagger
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document, swaggerCustomOptions);

  // Expose port
  await app.listen(port);
  await Logger.log("==============================")
  await Logger.log(`Server running on [${process.env.API_SERVTYPE}][v${setVersion}] : ${await app.getUrl()}`, 'Bootstrap');
  await Logger.log("==============================")
}
bootstrap();

