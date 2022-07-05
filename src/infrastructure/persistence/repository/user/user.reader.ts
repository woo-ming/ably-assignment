import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { EntityNotFoundException } from 'src/common/exception/exception';
import { UserReader } from 'src/domain/user/repository/user.reader';
import { User } from 'src/domain/user/entity/user';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../../entity/user.entity';

@Injectable()
export class UserReaderImpl implements UserReader {
  private readonly userRepository: Repository<UserEntity>;

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();

    if (!user) throw new EntityNotFoundException();
    return new User(user);
  }

  async findByEmailOrPhone(emailOrPhone: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder()
      .where('email = :emailOrPhone OR phone = :emailOrPhone', {
        emailOrPhone,
      })
      .getOne();

    if (!user) throw new EntityNotFoundException();
    return new User(user);
  }
}
