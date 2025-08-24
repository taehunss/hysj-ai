import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from '../logger/logger.module';
import { HttpExceptionFilter } from './http.exception.filter';
import { InternalErrorFilter } from './internal-error.filter';

@Module({
  imports: [LoggerModule],
  providers: [
    InternalErrorFilter,
    HttpExceptionFilter,
    {
      provide: APP_FILTER,
      useClass: InternalErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [InternalErrorFilter, HttpExceptionFilter],
})
export class FilterModule {}
