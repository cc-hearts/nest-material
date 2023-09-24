import { HttpException, HttpStatus } from '@nestjs/common';

export class ServerErrorException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
