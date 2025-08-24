import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { HoroscopeModule } from './modules/horoscope/horoscope.module';

@Module({
  imports: [InfrastructureModule, HoroscopeModule],
})
export class AppModule {}
