import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard
  extends PassportAuthGuard(['jwt-header', 'jwt-cookie'])
  implements CanActivate
{
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // /sse 요청은 인증 없이 통과
    if (
      this.getRequest(context).url.includes('sse') ||
      this.getRequest(context).url.includes('message')
    ) {
      return true;
    }

    return super.canActivate(context);
  }
}
