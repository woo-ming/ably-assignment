import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as dayjs from 'dayjs';
import {
  CellphoneVerificationExceptionMessage,
  UnauthorizedExceptionMessage,
} from 'src/common/constant/error-message';
import { EntityNotFoundException } from 'src/common/exception/exception';
import { UserDITokens } from 'src/domain/user/di/user-di-tokens';
import { User } from 'src/domain/user/entity/user';
import { UserService } from 'src/domain/user/service/user.service';
import { NotificationDITokens } from 'src/infrastructure/notification/di/notification-di-tokens';
import { NotificationService } from 'src/infrastructure/notification/notification.service';
import { CellPhoneVerificationDITokens } from 'src/infrastructure/persistence/di/cellphone-verification.module';
import { CellphoneVerificationEntity } from 'src/infrastructure/persistence/entity/cellphone-verification.entity';
import { CellphoneVerificationReader } from 'src/infrastructure/persistence/repository/cellphone-verification/cellphone-verification.reader';
import { CellPhoneVerificationStore } from 'src/infrastructure/persistence/repository/cellphone-verification/cellphone-verification.store';
import { TokenPairDto } from 'src/interface/auth/api/auth.dto';

export interface JwtPayload {
  userId: string;
}

@Injectable()
export class AuthFacade {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject(UserDITokens.UserService)
    private readonly userService: UserService,
    @Inject(NotificationDITokens.NotificationService)
    private readonly notificationService: NotificationService,
    @Inject(CellPhoneVerificationDITokens.CellPhoneVerificationReader)
    private readonly cellphoneVerificationReader: CellphoneVerificationReader,
    @Inject(CellPhoneVerificationDITokens.CellPhoneVerificationStore)
    private readonly cellphoneVerificationStore: CellPhoneVerificationStore,
  ) {}
  async sendVerificationCode({
    phone,
  }: {
    phone: string;
  }): Promise<CellphoneVerificationEntity> {
    const verificationCode = this.generateRandomStringNumber(6);
    const message = `인증번호는 [${verificationCode}] 입니다`;

    await this.notificationService.sendSms([
      {
        phone,
        message,
      },
    ]);
    const verificationCodeEntity = await this.cellphoneVerificationStore.store(
      CellphoneVerificationEntity.of({
        phone,
        verificationCode,
      }),
    );

    return verificationCodeEntity;
  }

  async verifyCode({
    verificationId,
    verificationCode,
  }: {
    verificationId: number;
    verificationCode: string;
  }) {
    const now: Date = dayjs().toDate();
    const cellphoneVerificationEntity = await this.cellphoneVerificationReader
      .retrieveCellphoneVerificationById({
        id: verificationId,
      })
      .catch((error: Error) => {
        if (error instanceof EntityNotFoundException) {
          return null;
        } else {
          throw error;
        }
      });

    if (!cellphoneVerificationEntity) {
      throw new BadRequestException(
        CellphoneVerificationExceptionMessage.notFound,
      );
    }

    if (cellphoneVerificationEntity.isExpired(now)) {
      cellphoneVerificationEntity.expire();
      await this.cellphoneVerificationStore.store(cellphoneVerificationEntity);
      throw new BadRequestException(
        CellphoneVerificationExceptionMessage.expired,
      );
    }

    if (cellphoneVerificationEntity.verificationCode !== verificationCode) {
      throw new BadRequestException(
        CellphoneVerificationExceptionMessage.invalid,
      );
    }

    cellphoneVerificationEntity.verify(now);

    return await this.cellphoneVerificationStore.store(
      cellphoneVerificationEntity,
    );
  }

  async signUp(dto: {
    verificationId: number;
    name: string;
    phone: string;
    email: string;
    nickname: string;
    password: string;
  }): Promise<TokenPairDto> {
    const { verificationId, ...command } = dto;
    const verificationEntity =
      await this.cellphoneVerificationReader.retrieveCellphoneVerificationById({
        id: verificationId,
      });

    if (!verificationEntity.verified)
      throw new BadRequestException(
        CellphoneVerificationExceptionMessage.invalid,
      );
    else if (verificationEntity.expired)
      throw new BadRequestException(
        CellphoneVerificationExceptionMessage.expired,
      );

    verificationEntity.expire();

    const userEntity = await this.userService.registerUser(command);
    await this.cellphoneVerificationStore.store(verificationEntity);
    return this.createTokenPair({ userId: userEntity.id });
  }

  async signIn({
    emailOrPhone,
    password,
  }: {
    emailOrPhone: string;
    password: string;
  }): Promise<TokenPairDto> {
    const userEntity: User = await this.userService.retrieveUserByEmailOrPhone({
      emailOrPhone,
    });

    if (!userEntity.isValidPassword(password))
      throw new UnauthorizedException(
        UnauthorizedExceptionMessage.passwordInvalid,
      );

    return this.createTokenPair({ userId: userEntity.id });
  }

  private generateRandomStringNumber(length: number): string {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += '0123456789'.charAt(Math.floor(Math.random() * 10));
    }
    return result;
  }

  private createTokenPair({ userId }: JwtPayload): TokenPairDto {
    const payload = { userId };

    return {
      accessToken: this.jwtService.sign(payload, {
        ...this.configService.get('jwt').access,
      }),
      refreshToken: this.jwtService.sign(payload, {
        ...this.configService.get('jwt').refresh,
      }),
    };
  }
}
