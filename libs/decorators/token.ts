import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetToken = createParamDecorator(
  (_, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers.authorization?.split('Bearer ')[1];
  },
);
