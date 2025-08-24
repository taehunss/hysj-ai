import { Injectable } from '@nestjs/common';
import { TSLogger } from 'src/infrastructure/logger/logger';

@Injectable()
export class HoroscopeService {
  constructor(private readonly logger: TSLogger) {}
}
