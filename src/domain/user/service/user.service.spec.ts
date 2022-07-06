import { Injectable, Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserDITokens } from '../di/user-di-tokens';
import { UserReader } from '../repository/user.reader';
import { UserStore } from '../repository/user.store';
import { UserServiceImpl } from './user.service';
import { UserAlreadyExistsException } from '../../../common/exception/user-exception';
import { User } from '../entity/user';

@Injectable()
class UserMemoryRepository implements UserStore, UserReader {
  private users: User[] = [
    new User({
      name: '이름',
      nickname: '닉네임',
      email: '이메일@도메인.com',
      phone: '010-1234-5678',
      password: '비밀번호',
    }),
  ];

  async store(user: User): Promise<User> {
    if (
      this.users.filter((u) => u.email === user.email || u.phone === user.phone)
        .length > 0
    )
      throw new UserAlreadyExistsException();

    this.users.push(user);
    return user;
  }

  async findByEmailOrPhone(emailOrPhone: string): Promise<User> {
    return this.users.filter(
      (user) => user.email === emailOrPhone || user.phone === emailOrPhone,
    )[0];
  }

  async findById(id: string): Promise<User> {
    return this.users.filter((user) => user.id === id)[0];
  }
}

const persistenceProviders: Provider[] = [
  UserMemoryRepository,
  {
    provide: UserDITokens.UserStore,
    useExisting: UserMemoryRepository,
  },
  {
    provide: UserDITokens.UserReader,
    useExisting: UserMemoryRepository,
  },
];

describe('UserServiceImpl', () => {
  let service: UserServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserServiceImpl, ...persistenceProviders],
    }).compile();

    service = module.get<UserServiceImpl>(UserServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('register user', async () => {
    // given
    const command = {
      name: '이름',
      nickname: '닉네임',
      email: '이메일2@도메인.com',
      phone: '010-1234-5679',
      password: '비밀번호',
    };
    // when
    const result = await service.registerUser(command);

    // then
    expect(result.id).toBeDefined();
  });

  it('register user with already exists email', async () => {
    // given
    const command = {
      name: '이름',
      nickname: '닉네임',
      email: '이메일@도메인.com',
      phone: '010-1234-5678',
      password: '비밀번호',
    };
    // when
    await service.registerUser(command).catch((error) => {
      //then
      expect(error).toBeInstanceOf(UserAlreadyExistsException);
    });
  });

  it('retrieve user by id', async () => {
    // given
    const command = {
      name: '이름',
      nickname: '닉네임',
      email: '이메일2@도메인.com',
      phone: '010-1234-5679',
      password: '비밀번호',
    };
    const user = await service.registerUser(command);

    // when
    const result1 = await service.retrieveUserByEmailOrPhone({
      emailOrPhone: user.email,
    });

    const result2 = await service.retrieveUserByEmailOrPhone({
      emailOrPhone: user.phone,
    });
    // then
    expect(result1.id).toBe(user.id);
    expect(result2.id).toBe(user.id);
  });
});
