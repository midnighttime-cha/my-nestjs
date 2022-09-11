import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { SharedModule } from './shared/shared.module';
import { HealthModule } from './health/health.module';
import { HttpExceptionFilter } from './shared/exeption/http-exception.filter';
import { LoggingInterceptor } from './shared/interceptor/logging.interceptor';
import { TransformInterceptor } from './shared/interceptor/transform.interceptor';
import { ErrorsInterceptor } from './shared/interceptor/errors.interceptor';
import { CacheInterceptor } from './shared/interceptor/cache.interceptor';
import { TimeoutInterceptor } from './shared/interceptor/timeout.interceptor';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        name: "default", // connection name: [String]
        type: "postgres", // database driver:  [String] 'postgres', 'mysql', 'oracle', 'mssql'
        applicationName: process.env.APP_NAME, // application name: [String]
        host: process.env.PG_HOST, // database host
        port: parseInt(process.env.PG_PORT), // database port: [Number]
        username: process.env.PG_USERNAME, // database username: [String]
        password: process.env.PG_PASSWORD, // database password: [String]
        database: process.env.PG_DATABASE, // database name: [String]
        schema: process.env.PG_SCHEMA, // database schema: [String]
        entities: [
          "dist/**/**/*.entity{.ts,.js}" // entity path: [String]
        ],
        autoLoadEntities: true,
        synchronize: true,  // database synchronize: [Boolean] true=update table, false=non update table
        logging: process.env.APP_SERVTYPE === 'LOCAL' ? true : false,  // database log: [Boolean]
        retryDelay: 300,  // database retry delay: [Number]
        maxQueryExecutionTime: process.env.APP_SERVTYPE === 'LOCAL' ? 300 : 0,  // database test query time: [Number]
        connectTimeoutMS: 30000,  // connection timeout: [NUmber]
      }
    ),
    EmailModule,
    SharedModule,
    HealthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule { }
