import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CommonResponse } from '../response/common-response';

export const swaggerLoader = (application: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Ably Assignment API')
    .setDescription('이 문서는 Ably 과제용 API 문서입니다.')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(application, config, {
    extraModels: [CommonResponse],
  });
  SwaggerModule.setup('api', application, document);
};
