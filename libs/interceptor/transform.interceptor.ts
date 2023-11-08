import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { useFormatResponseLogger } from '../logger/hooks';
import { Response } from 'express';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const req = context.switchToHttp().getRequest();
        Logger.log(useFormatResponseLogger(req), data);
        return data;
      }),
    );
  }
}
