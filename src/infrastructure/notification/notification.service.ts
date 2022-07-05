import { Injectable } from '@nestjs/common';

export interface Recipient {
  phone: string;
  message: string;
}

@Injectable()
export class NotificationService {
  sendSms(recipients: Recipient[]): Promise<boolean> {
    // Send SMS to recipients

    return Promise.resolve(true);
  }
}
