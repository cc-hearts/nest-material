import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProvider } from './provder/user.provider';

@Module({
  controllers: [UserController],
  providers: [UserService, UserProvider],
  exports: [UserService, UserProvider],
})
export class UserModule {}
