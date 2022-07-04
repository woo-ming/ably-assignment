import { InjectDataSource } from '@nestjs/typeorm';
import { UserStore } from 'src/domain/user/repository/user.store';
import { User } from 'src/domain/user/user';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

export class UserStoreImpl implements UserStore {
  private readonly userRepository: Repository<UserEntity>;

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }

  async store(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
