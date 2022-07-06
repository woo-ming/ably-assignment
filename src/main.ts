import { NestFactory } from '@nestjs/core';
import { AppModule } from './di/app.module';
import { Express } from 'express';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
