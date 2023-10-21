import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MenuProvider } from './providers/menu.provider';
@Module({
  controllers: [MenuController],
  providers: [MenuService, MenuProvider]
})
export class MenuModule {}