import { Module, Provider } from '@nestjs/common';
import { NotificationDITokens } from './di/notification-di-tokens';

const notificationProviders: Provider[] = [
  {
    provide: NotificationDITokens.NotificationService,
    useValue: 'NotificationService',
  },
];

@Module({
  providers: [...notificationProviders],
  exports: [...notificationProviders],
})
export class NotificationModule {}
