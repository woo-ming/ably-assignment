import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthFacade } from 'src/application/auth/auth.service';
import { DomainUserModule } from 'src/domain/user/di/user.module';
import { NotificationModule } from 'src/infrastructure/notification/notification.module';
import { CellphoneVerificationPersistenceModule } from 'src/infrastructure/persistence/di/cellphone-verification.module';
import { AuthController } from 'src/interface/auth/api/auth.controller';

@Module({
  imports: [
    ConfigModule,
    JwtModule,
    DomainUserModule,
    NotificationModule,
    CellphoneVerificationPersistenceModule,
  ],
  providers: [AuthFacade],
  controllers: [AuthController],
})
export class AuthModule {}
