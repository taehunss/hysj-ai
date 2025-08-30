import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService extends ConfigService {
  constructor() {
    super();
  }
}
