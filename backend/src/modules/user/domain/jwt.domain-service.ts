import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvConfigService } from 'src/infrastructure/env-config/env-config.service';
import { AccessTokenPayload } from './token-payload';

@Injectable()
export class JwtDomainService {
  constructor(
    private readonly configService: EnvConfigService,

    private readonly jwtService: JwtService,
  ) {}

  sign(payload: AccessTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }
}
