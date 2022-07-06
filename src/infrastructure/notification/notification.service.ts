import { Injectable } from '@nestjs/common';

export interface Recipient {
  phone: string;
  message: string;
}

export interface NotificationService {
  sendSms(recipients: Recipient[]): Promise<boolean>;
}

@Injectable()
export class NotificationServiceImpl implements NotificationService {
  async sendSms(recipients: Recipient[]): Promise<boolean> {
    // Send SMS to recipients

    return Promise.resolve(true);
  }
}
