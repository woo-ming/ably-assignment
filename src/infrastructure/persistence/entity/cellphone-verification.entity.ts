import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import dayjs from 'dayjs';

@Entity('cellphone_verification')
export class CellphoneVerificationEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 16 })
  cellphone: string;
  @Column({ length: 6 })
  verificationCode: string;
  @Column({ default: false })
  verified?: boolean;
  @Column({ type: 'timestamp', default: null, nullable: true })
  verifiedAt?: Date;
  @Column({ type: 'timestamp' })
  expiredAt: Date;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  isExpired(now: Date): boolean {
    return dayjs(now).isAfter(dayjs(this.expiredAt));
  }

  verify(): void {
    this.verified = true;
    this.verifiedAt = dayjs().toDate();
  }
}
