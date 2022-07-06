import { Module, Provider } from '@nestjs/common';
import { NotificationDITokens } from './di/notification-di-tokens';
import { NotificationServiceImpl } from './notification.service';

const notificationProviders: Provider[] = [
  {
    provide: NotificationDITokens.NotificationService,
    useClass: NotificationServiceImpl,
  },
];

@Module({
  providers: [...notificationProviders],
  exports: [...notificationProviders],
})
export class NotificationModule {}
