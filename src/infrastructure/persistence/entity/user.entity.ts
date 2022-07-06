import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
@Index('user_uk_email', ['email'], { unique: true })
@Index('user_uk_phone', ['phone'], { unique: true })
export class UserEntity {
  @PrimaryColumn()
  id: string;
  @Column({ length: 32, comment: '이름' })
  name: string;
  @Column({ length: 16, unique: true, comment: '전화번호' })
  phone: string;
  @Column({ length: 32, unique: true, comment: '이메일' })
  email: string;
  @Column({ length: 32, comment: '별명' })
  nickname: string;
  @Column({ length: 256, comment: '비밀번호' })
  password: string;
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}
