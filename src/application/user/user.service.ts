import { Inject, Injectable } from '@nestjs/common';
import { UserDITokens } from 'src/domain/user/di/user-di-tokens';
import { User } from 'src/domain/user/entity/user';
import { UserService } from 'src/domain/user/service/user.service';

@Injectable()
export class UserFacade {
  constructor(
    @Inject(UserDITokens.UserService)
    private readonly userService: UserService,
  ) {}

  async retrieveUserById({ userId }: { userId: string }): Promise<User> {
    return this.userService.retrieveUserById({ id: userId });
  }

  async modifyUserPassword({
    id,
    password,
  }: {
    id: string;
    password: string;
  }): Promise<User> {
    return await this.userService.modifyUserPassword({ id, password });
  }
}
