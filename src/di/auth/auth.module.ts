import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserFacade } from 'src/application/user/user.service';
import { DomainUserModule } from 'src/domain/user/di/user.module';
import { NotificationModule } from 'src/infrastructure/notification/notification.module';
import { CellphoneVerificationPersistenceModule } from 'src/infrastructure/persistence/di/cellphone-verification.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule,
    DomainUserModule,
    NotificationModule,
    CellphoneVerificationPersistenceModule,
  ],
  providers: [UserFacade],
  controllers: [],
})
export class AuthModule {}
