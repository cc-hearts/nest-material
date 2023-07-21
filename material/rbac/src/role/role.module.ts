import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from "./role.controller";
import { RoleProvider } from "./providers/role.provider";
@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleProvider]
})
export class RoleModule {}
