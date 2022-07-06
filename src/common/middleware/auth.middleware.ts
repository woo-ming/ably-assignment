import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IsNumber } from 'class-validator';
import { UnauthorizedExceptionMessage } from '../constant/error-message';
import { JwtPayload } from 'src/application/auth/auth.service';

export class UserProfileDto {
  @IsNumber()
  readonly accountId: number;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  readonly AUTH_URL: string;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    /** authorization check */
    if (!authorization)
      throw new UnauthorizedException(UnauthorizedExceptionMessage.invalid);

    const [type, token] = authorization.split(' ');

    if (type.toLowerCase() !== 'bearer')
      throw new UnauthorizedException(UnauthorizedExceptionMessage.invalid);

    let verifiedToken: JwtPayload;
    /** token validate */
    try {
      verifiedToken = await this.validate({ token });
    } catch (error) {
      Logger.error(error);
      throw new UnauthorizedException(UnauthorizedExceptionMessage.invalid);
    }

    /** inject account information in request */
    request.user = {
      id: verifiedToken.userId,
    };

    next();
  }

  private validate({ token }: { token: string }): JwtPayload {
    const verifiedToken = this.jwtService.verify(token, {
      secret: this.configService.get<string>('jwt.moduleOptions.secret'),
      issuer: this.configService.get<string>(
        'jwt.moduleOptions.signOptions.issuer',
      ),
    });

    return verifiedToken;
  }
}
