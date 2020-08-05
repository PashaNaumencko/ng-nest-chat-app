import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add a route prefix
  app.setGlobalPrefix('api');
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
