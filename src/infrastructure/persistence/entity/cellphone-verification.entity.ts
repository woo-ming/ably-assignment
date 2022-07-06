import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as dayjs from 'dayjs';

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
  @Column({ default: false })
  expired?: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  isExpired(now: Date): boolean {
    return dayjs(now).isAfter(dayjs(this.expiredAt));
  }

  expire(): void {
    this.expired = true;
  }

  verify(now: Date): void {
    this.verified = true;
    this.verifiedAt = now;
  }

  static of({
    phone,
    verificationCode,
  }: {
    phone: string;
    verificationCode: string;
  }): CellphoneVerificationEntity {
    const entity = new CellphoneVerificationEntity();
    entity.cellphone = phone;
    entity.verificationCode = verificationCode;
    entity.expiredAt = dayjs().add(3, 'minute').toDate();
    return entity;
  }
}
