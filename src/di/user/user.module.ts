import { Module } from '@nestjs/common';
import { UserFacade } from 'src/application/user/user.service';
import { DomainUserModule } from 'src/domain/user/di/user.module';
import { CellphoneVerificationPersistenceModule } from 'src/infrastructure/persistence/di/cellphone-verification.module';
import { UserController } from 'src/interface/user/api/user.controller';

@Module({
  imports: [DomainUserModule, CellphoneVerificationPersistenceModule],
  providers: [UserFacade],
  controllers: [UserController],
})
export class UserModule {}
