import { Module, Provider } from '@nestjs/common';
import { UserServiceImpl } from '../service/user.service';

const serviceProviders: Provider[] = [
  {
    provide: 'UserService',
    useClass: UserServiceImpl,
  },
];

@Module({
  imports: [],
  providers: [...serviceProviders],
  exports: [...serviceProviders],
})
export class DomainUserModule {}
