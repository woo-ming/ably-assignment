import { Module } from '@nestjs/common';
import { UserFacade } from 'src/application/user/user.service';
import { DomainUserModule } from 'src/domain/user/di/user.module';
import { UserController } from 'src/interface/user/api/user.controller';

@Module({
  imports: [DomainUserModule],
  providers: [UserFacade],
  controllers: [UserController],
})
export class UserModule {}
