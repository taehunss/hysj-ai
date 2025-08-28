import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { TSLogger } from 'src/infrastructure/logger/logger';
import { AccessTokenPayload } from '../interface/access-token.payload';
import { UserAuth } from '../interface/user-auth.interface';
/**
 * @description
 * 소켓 JWT 인증 전략
 * 소켓 연결 시 토큰 검증 및 인증 처리
 */
@Injectable()
export class JwtHeaderStrategy extends PassportStrategy(
  Strategy,
  'jwt-header',
) {
  constructor(
    private readonly logger: TSLogger,
    private readonly configService: ConfigService,
  ) {
    const secretKey = configService.get('JWT_ACCESS_TOKEN_SECRET');
    logger.log(`JWT Header Strategy - secretKey: ${secretKey}`);
    super({
      jwtFromRequest: (req: Request) => {
        if (req.headers.authorization) {
          return req.headers.authorization.split(' ')[1];
        }

        return null;
      },
      secretOrKey: secretKey,
      ignoreExpiration: false,
    });
  }

  validate(payload: AccessTokenPayload): UserAuth {
    const userAuth: UserAuth = new UserAuth(
      payload.sub,
      payload.name,
      payload.email,
    );

    return userAuth;
  }
}
