import { ulid } from 'ulid';
import * as bcrypt from 'bcrypt';

export class User {
  id: string;
  name: string;
  phone: string;
  email: string;
  nickname: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    id,
    name,
    phone,
    email,
    nickname,
    password,
    createdAt,
    updatedAt,
  }: {
    id?: string;
    name: string;
    phone: string;
    email: string;
    nickname: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = id ? id : ulid();
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.nickname = nickname;
    this.password = id ? password : this.hashPassword(password);
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  private hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync();

    return bcrypt.hashSync(password, salt);
  }

  isValidPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

  modifyPassword(password: string): void {
    this.password = this.hashPassword(password);
  }
}
