import { Injectable } from '@nestjs/common';

@Injectable()
export class RbacService {
  getHello(): string {
    return 'Hello World!';
  }
}
