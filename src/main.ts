import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformationInterceptor } from './interceptors/transformation.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ transform: true, })
  );

  app.useGlobalInterceptors(
    new TransformationInterceptor(new Reflector()));
    
  await app.listen(3000);
}
bootstrap();
