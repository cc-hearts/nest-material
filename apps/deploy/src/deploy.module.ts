import { Module } from '@nestjs/common';
import { AppController } from './deploy.controller';
import { AppService } from './deploy.service';
import { DeployModule } from './deploy/deploy.module';
import {GlobalModule} from "../../../libs/global/global.module";

@Module({
  imports: [DeployModule, GlobalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
