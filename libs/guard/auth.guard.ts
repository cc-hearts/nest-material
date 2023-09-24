import { fn } from '@cc-heart/utils/helper';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isExistWhitePath } from '../decorators/whitePath';
import { getConfig } from '../utils/env';
import { useFormatRequestLogger } from '../logger/hooks';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {
    /** */
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const type = context.getType();
    switch (type) {
      case 'http':
        const request = context.switchToHttp().getRequest();
        const handleFn = context.getHandler() as fn;
        const validated = isExistWhitePath(handleFn);
        let token = request.headers.authorization;
        if (!token && !validated) {
          throw new UnauthorizedException('账号未登陆');
        }
        token = token?.split('Bearer ')[1];
        const message = useFormatRequestLogger(request);
        Logger.log(message);
        try {
          if (token) {
            request['_user'] = await this.jwtService.verify(token, {
              secret: getConfig().secret,
            });
          }
        } catch (e) {
          if (!validated) throw new UnauthorizedException(e.toString());
        }
        // 校验参数
        return true;
      case 'rpc':
        break;
      case 'ws':
        break;
      default:
        break;
    }
  }
}
