import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { getConfig } from './utils/env';
import { generatorSwaggerDocument } from './utils/swagger';
import { AuthGuard } from './guard/auth.guard';
import { JwtService } from '@nestjs/jwt';
async function bootstrap() {
  const config = getConfig();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new AuthGuard(app.get(JwtService)));

  generatorSwaggerDocument(app);
  await app.listen(config.port);
}
bootstrap();
