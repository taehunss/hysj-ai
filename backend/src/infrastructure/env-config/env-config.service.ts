import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService {
  constructor(private configService: ConfigService) {}

  get<T>(key: string): T {
    return this.configService.get<T>(key);
  }

  getOrThrow<T>(key: string): T {
    return this.configService.getOrThrow<T>(key);
  }
}
