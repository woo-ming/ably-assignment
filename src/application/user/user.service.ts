import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CellphoneVerificationExceptionMessage } from 'src/common/constant/error-message';
import { UserDITokens } from 'src/domain/user/di/user-di-tokens';
import { User } from 'src/domain/user/entity/user';
import { UserService } from 'src/domain/user/service/user.service';
import { CellPhoneVerificationDITokens } from 'src/infrastructure/persistence/di/cellphone-verification.module';
import { CellphoneVerificationReader } from 'src/infrastructure/persistence/repository/cellphone-verification/cellphone-verification.reader';
import { CellPhoneVerificationStore } from 'src/infrastructure/persistence/repository/cellphone-verification/cellphone-verification.store';

@Injectable()
export class UserFacade {
  constructor(
    @Inject(UserDITokens.UserService)
    private readonly userService: UserService,
    @Inject(CellPhoneVerificationDITokens.CellPhoneVerificationReader)
    private readonly cellphoneVerificationReader: CellphoneVerificationReader,
    @Inject(CellPhoneVerificationDITokens.CellPhoneVerificationStore)
    private readonly cellphoneVerificationStore: CellPhoneVerificationStore,
  ) {}

  async retrieveUserById({ userId }: { userId: string }): Promise<User> {
    return this.userService.retrieveUserById({ id: userId });
  }

  async modifyUserPassword({
    id,
    password,
    verificationId,
  }: {
    id: string;
    password: string;
    verificationId: number;
  }): Promise<User> {
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

    const userEntity = await this.userService.modifyUserPassword({
      id,
      password,
    });
    await this.cellphoneVerificationStore.store(verificationEntity);
    return userEntity;
  }
}
