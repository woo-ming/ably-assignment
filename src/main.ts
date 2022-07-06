import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { swaggerLoader } from './common/documentation/swagger';
import { HttpExceptionFilter } from './common/exception/exception.filter';
import { AppModule } from './di/app.module';

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
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  swaggerLoader(app);
  await app.listen(+(process.env.PORT as string));
}
bootstrap();
