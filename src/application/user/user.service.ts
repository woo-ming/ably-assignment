import { Inject, Injectable } from '@nestjs/common';
import { UserDITokens } from 'src/domain/user/di/user-di-tokens';
import { UserService } from 'src/domain/user/service/user.service';

@Injectable()
export class UserFacade {
  constructor(
    @Inject(UserDITokens.UserService)
    private readonly userService: UserService,
  ) {}

  // #TODO: 회원 조회

  // #TODO: 회원 패스워드 수정
}
