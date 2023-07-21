import { HttpStatus } from '@nestjs/common';

export class BaseResponse<T> {
  constructor(
    private readonly message: string,
    private readonly data: T = null,
    private readonly code = HttpStatus.OK,
  ) {}
}
