import { Module } from '@nestjs/common';
import { DeployService } from './deploy.service';
import { DeployController } from './deploy.controller';
import { DeployProvider } from './providers/deploy.provider';
@Module({
  controllers: [DeployController],
  providers: [DeployService, DeployProvider],
})
export class DeployModule {}
