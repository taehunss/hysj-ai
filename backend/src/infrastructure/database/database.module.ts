import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USER_REPOSITORY } from 'src/modules/user/domain/user.repository.interface';
import { UserRepositoryImpl } from '../../modules/user/infrastructure/user.repository.impl';
import { EnvConfigService } from '../env-config/env-config.service';
import { PersonEntity } from './entity/person.entity';
import { UserEntity } from './entity/user.entity';
import { typeOrmConfig } from './typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: EnvConfigService) =>
        typeOrmConfig(configService),
      inject: [EnvConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity, PersonEntity]),
  ],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class DatabaseModule {}
