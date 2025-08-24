import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from '../logger/logger.module';
import { BrowserManager } from './browser/browser.manager';
import { CrawlingService } from './crawling.service';

@Module({
  imports: [LoggerModule, ScheduleModule.forRoot()],
  providers: [CrawlingService, BrowserManager],
  exports: [CrawlingService, BrowserManager],
})
export class CrawlingModule {}
