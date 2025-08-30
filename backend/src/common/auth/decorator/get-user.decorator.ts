import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserAuth } from '../interface/user-auth.interface';

export const GetUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserAuth => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
