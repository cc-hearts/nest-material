import { Global, Module } from '@nestjs/common';
import { DatabaseProvider } from '../provider/database.provider';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  providers: [...DatabaseProvider, JwtService],
  exports: [...DatabaseProvider, JwtService],
})
export class GlobalModule {}
