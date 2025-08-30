import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { LOGGER, Logger } from 'src/common/logger/logger.interface';
import { EnvConfigService as ConfigService } from 'src/infrastructure/env-config/env-config.service';
import { AccessTokenPayload } from '../interface/access-token.payload';
import { UserAuth } from '../interface/user-auth.interface';

/**
 * @description
 * 소켓 JWT 인증 전략
 * 소켓 연결 시 토큰 검증 및 인증 처리
 */
@Injectable()
export class JwtCookieStrategy extends PassportStrategy(
  Strategy,
  'jwt-cookie',
) {
  constructor(
    @Inject(LOGGER)
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {
    const secretKey = configService.get('JWT_ACCESS_TOKEN_SECRET');
    logger.log(`JWT Cookie Strategy - secretKey: ${secretKey}`);
    super({
      jwtFromRequest: (req: Request) => {
        if (req.cookies && req.cookies.accessToken) {
          return req.cookies.accessToken;
        }

        return null;
      },
      ignoreExpiration: false,
      secretOrKey: secretKey,
    });
  }

  validate(payload: AccessTokenPayload): UserAuth {
    const userAuth: UserAuth = new UserAuth(payload);

    this.logger.log(`Pass JWT Cookie Guard - ${userAuth.code}`);
    return userAuth;
  }
}
