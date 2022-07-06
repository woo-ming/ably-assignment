import { Inject } from '@nestjs/common';

import { UserDITokens } from '../di/user-di-tokens';
import {
  ModifyUserPasswordCommand,
  RegisterUserCommand,
} from '../dto/user-command';
import { UserEmailOrPhoneCriteria } from '../dto/user-criteria';
import { EntityNotFoundExceptionMessage } from '../exception/error-message';
import { EntityNotFoundException } from '../../../common/exception/exception';
import { UserReader } from '../repository/user.reader';
import { UserStore } from '../repository/user.store';
import { User } from '../entity/user';

export interface UserService {
  registerUser(command: RegisterUserCommand): Promise<User>;
  modifyUserPassword(command: ModifyUserPasswordCommand): Promise<User>;
  retrieveUserByEmailOrPhone(criteria: UserEmailOrPhoneCriteria): Promise<User>;
}

export class UserServiceImpl implements UserService {
  constructor(
    @Inject(UserDITokens.UserReader)
    private readonly userReader: UserReader,
    @Inject(UserDITokens.UserStore)
    private readonly userStore: UserStore,
  ) {}

  async registerUser({
    email,
    phone,
    name,
    nickname,
    password,
  }: RegisterUserCommand): Promise<User> {
    return await this.userStore.store(
      new User({
        email,
        phone,
        name,
        nickname,
        password,
      }),
    );
  }

  async modifyUserPassword({
    id,
    password,
  }: ModifyUserPasswordCommand): Promise<User> {
    const user: User = await this.userReader
      .findById(id)
      .catch((error: Error) => {
        if (error instanceof EntityNotFoundException) {
          throw new EntityNotFoundException(
            EntityNotFoundExceptionMessage.UserNotFoundMessage,
          );
        } else {
          throw error;
        }
      });

    user.updatePassword(password);

    return await this.userStore.store(user);
  }

  async retrieveUserByEmailOrPhone({
    emailOrPhone,
  }: UserEmailOrPhoneCriteria): Promise<User> {
    return await this.userReader.findByEmailOrPhone(emailOrPhone);
  }
}
