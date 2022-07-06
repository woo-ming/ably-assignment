import { Module } from '@nestjs/common';
import { UserFacade } from 'src/application/user/user.service';
import { DomainUserModule } from 'src/domain/user/di/user.module';

@Module({
  imports: [DomainUserModule],
  providers: [UserFacade],
  controllers: [],
})
export class UserModule {}
