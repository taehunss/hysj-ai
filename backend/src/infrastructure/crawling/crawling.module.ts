import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BrowserManager } from './browser/browser.manager';
import { CrawlingService } from './crawling.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [CrawlingService, BrowserManager],
  exports: [CrawlingService, BrowserManager],
})
export class CrawlingModule {}
