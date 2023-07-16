import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { GlobalModule } from './global/global.module';
import { JwtModule } from '@nestjs/jwt';
import { getConfig } from './utils/env';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: getConfig().secret,
      signOptions: { expiresIn: '3600 days' },
    }),
    GlobalModule,
    UserModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
