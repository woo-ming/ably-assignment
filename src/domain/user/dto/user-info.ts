import { User } from '../entity/user';

export class UserMainInfo {
  id: string;
  name: string;
  nickname: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.nickname = user.nickname;
    this.phone = user.phone;
    this.email = user.email;
    this.createdAt = user.createdAt as Date;
    this.updatedAt = user.updatedAt as Date;
  }
}
