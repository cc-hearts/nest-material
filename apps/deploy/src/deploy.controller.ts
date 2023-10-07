import { Controller, Get } from '@nestjs/common';
import { AppService } from './deploy.service';

@Controller()
export class AppController {
  constructor(private readonly deployService: AppService) {}

  @Get()
  getHello(): string {
    return this.deployService.getHello();
  }
}
