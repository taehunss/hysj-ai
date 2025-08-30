import { Global, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LOGGER } from 'src/common/logger/logger.interface';
import { LogViewerController } from './log-viewer.controller';
import { LogViewerGateway } from './log-viewer.gateway';
import { LoggerImpl } from './logger';

@Global()
@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [
    {
      provide: LOGGER,
      useClass: LoggerImpl,
    },
    LogViewerGateway,
  ],
  controllers: [LogViewerController],
  exports: [LOGGER, LogViewerGateway],
})
export class LoggerModule {}
