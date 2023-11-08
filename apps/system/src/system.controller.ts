import { Controller, Get } from '@nestjs/common';
import { RbacService } from './system.service';

@Controller()
export class RbacController {
  constructor(private readonly rbacService: RbacService) {}

  @Get()
  getHello(): string {
    return this.rbacService.getHello();
  }
}
