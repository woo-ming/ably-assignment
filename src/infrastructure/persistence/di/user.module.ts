import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDITokens } from 'src/domain/user/di/user-di-tokens';
import { UserEntity } from '../entity/user.entity';
import { UserReaderImpl } from '../repository/user/user.reader';
import { UserStoreImpl } from '../repository/user/user.store';

const persistenceProviders: Provider[] = [
  {
    provide: UserDITokens.UserReader,
    useClass: UserReaderImpl,
  },
  {
    provide: UserDITokens.UserStore,
    useClass: UserStoreImpl,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [...persistenceProviders],
  exports: [TypeOrmModule, ...persistenceProviders],
})
export class UserPersistenceModule {}
