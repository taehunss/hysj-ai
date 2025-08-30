import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/auth/\bguard/auth.guard';
import { JwtCookieStrategy } from './common/auth/strategy/jwt-cookie.strategy';
import { JwtHeaderStrategy } from './common/auth/strategy/jwt-header.strategy';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ChatModule } from './modules/chat/chat.module';
import { PersonModule } from './modules/person/person.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [InfrastructureModule, PersonModule, ChatModule, UserModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    JwtHeaderStrategy,
    JwtCookieStrategy,
  ],
})
export class AppModule {}
