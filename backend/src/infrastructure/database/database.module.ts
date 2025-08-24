import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigService } from '../env-config/env-config.service';
import { typeOrmConfig } from './typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: EnvConfigService) =>
        typeOrmConfig(configService),
      inject: [EnvConfigService],
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
