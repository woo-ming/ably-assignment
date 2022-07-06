import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction) {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('content-agent');

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      this.logger.log(
        `\nRequest: ${method} ${originalUrl} ${contentLength}\nResponse: ${statusCode}\nUserAgent: ${userAgent} / UserIP: ${ip}`,
      );
    });
    next();
  }
}
