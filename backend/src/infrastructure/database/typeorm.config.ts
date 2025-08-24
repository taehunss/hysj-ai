import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvConfigService } from '../env-config/env-config.service';

export const typeOrmConfig = (
  configService: EnvConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: Number(configService.get('DB_PORT') ?? 5432),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    // dev(ts-node) & prod(dist js) 모두 대응
    entities: [__dirname + '/entity/**/*.entity.{ts,js}'],
    synchronize: true,
  };
};
