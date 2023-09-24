import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { UserRoleProvider } from './providers/user-role.provider';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [UserModule, RoleModule],
  controllers: [UserRoleController],
  providers: [UserRoleService, UserRoleProvider],
})
export class UserRoleModule {}
