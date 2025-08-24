import { Global, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LogViewerController } from './log-viewer.controller';
import { LogViewerGateway } from './log-viewer.gateway';
import { TSLogger } from './logger';

@Global()
@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [TSLogger, LogViewerGateway],
  controllers: [LogViewerController],
  exports: [TSLogger, LogViewerGateway],
})
export class LoggerModule {}
