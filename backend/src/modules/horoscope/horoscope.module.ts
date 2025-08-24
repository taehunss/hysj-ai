import { Module } from '@nestjs/common';
import { CrawlingModule } from 'src/infrastructure/crawling/crawling.module';
import { LLMModelModule } from 'src/infrastructure/llm-model/llm-model.module';
import { GetHoroscopeUsecase } from './get.horoscope.usecase';
import { HoroscopeController } from './horoscope.controller';
import { HoroscopeService } from './horoscope.service';

@Module({
  imports: [CrawlingModule, LLMModelModule],
  controllers: [HoroscopeController],
  providers: [HoroscopeService, GetHoroscopeUsecase],
})
export class HoroscopeModule {}
