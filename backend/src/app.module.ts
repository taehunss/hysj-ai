import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ChatModule } from './modules/chat/chat.module';
import { HoroscopeModule } from './modules/horoscope/horoscope.module';

@Module({
  imports: [InfrastructureModule, HoroscopeModule, ChatModule],
})
export class AppModule {}
