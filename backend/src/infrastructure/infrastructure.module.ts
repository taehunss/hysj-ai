import { Module } from '@nestjs/common';
import { CrawlingModule } from './crawling/crawling.module';
import { EnvConfigModule } from './env-config/env-config.module';
import { LoggerModule } from './logger/logger.module';
import { WebSocketModule } from './web-socket/web-socket.module';

@Module({
  imports: [CrawlingModule, LoggerModule, WebSocketModule, EnvConfigModule],
  exports: [CrawlingModule, LoggerModule, WebSocketModule, EnvConfigModule],
})
export class InfrastructureModule {}
