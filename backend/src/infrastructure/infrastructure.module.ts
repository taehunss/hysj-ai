import { Module } from '@nestjs/common';
import { CrawlingModule } from './crawling/crawling.module';
import { DatabaseModule } from './database/database.module';
import { EnvConfigModule } from './env-config/env-config.module';
import { LoggerModule } from './logger/logger.module';
import { WebSocketModule } from './web-socket/web-socket.module';

@Module({
  imports: [
    CrawlingModule,
    LoggerModule,
    WebSocketModule,
    EnvConfigModule,
    DatabaseModule,
  ],
  exports: [
    CrawlingModule,
    LoggerModule,
    WebSocketModule,
    EnvConfigModule,
    DatabaseModule,
  ],
})
export class InfrastructureModule {}
