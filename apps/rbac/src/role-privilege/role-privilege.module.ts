import { Module } from '@nestjs/common';
import { RolePrivilegeService } from './role-privilege.service';
import { RolePrivilegeController } from './role-privilege.controller';
import { RolePrivilegeProvider } from './providers/role-privilege.provider';
import { RoleModule } from '../role/role.module';
import { PrivilegeModule } from '../privilege/privilege.module';

@Module({
  imports: [RoleModule, PrivilegeModule],
  controllers: [RolePrivilegeController],
  providers: [RolePrivilegeService, RolePrivilegeProvider],
})
export class RolePrivilegeModule {}
