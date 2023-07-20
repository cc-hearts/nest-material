import { Module } from '@nestjs/common';
import { PrivilegeService } from './privilege.service';
import { PrivilegeController } from './privilege.controller';
import { PrivilegeProvider } from './providers/privilege.provider';
@Module({
  controllers: [PrivilegeController],
  providers: [PrivilegeService, PrivilegeProvider],
})
export class PrivilegeModule {}
