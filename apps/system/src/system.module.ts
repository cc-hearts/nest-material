import { Module } from '@nestjs/common';
import { RbacController } from './system.controller';
import { RbacService } from './system.service';
import { RoleModule } from './role/role.module';
import { JwtModule } from '@nestjs/jwt';
import { getConfig } from '../../../libs/utils/env';
import { GlobalModule } from '../../../libs/global/global.module';
import { UserModule } from './user/user.module';
import { PrivilegeModule } from './privilege/privilege.module';
import { RolePrivilegeModule } from './role-privilege/role-privilege.module';
import { UserRoleModule } from './user-role/user-role.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: getConfig().secret,
      signOptions: { expiresIn: getConfig().token_expiresIn },
    }),
    GlobalModule,
    RoleModule,
    UserModule,
    PrivilegeModule,
    RolePrivilegeModule,
    UserRoleModule,
    MenuModule,
  ],
  controllers: [RbacController],
  providers: [RbacService],
})
export class RbacModule {}
