import { Module, Provider } from '@nestjs/common';
import { UserPersistenceModule } from 'src/infrastructure/persistence/di/user.module';
import { UserServiceImpl } from '../service/user.service';
import { UserDITokens } from './user-di-tokens';

const serviceProviders: Provider[] = [
  {
    provide: UserDITokens.UserService,
    useClass: UserServiceImpl,
  },
];

@Module({
  imports: [UserPersistenceModule],
  providers: [...serviceProviders],
  exports: [...serviceProviders],
})
export class DomainUserModule {}
