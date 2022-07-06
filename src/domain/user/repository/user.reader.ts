import { User } from '../entity/user';

export interface UserReader {
  findById(id: string): Promise<User>;
  findByEmailOrPhone(emailOrPhone: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByPhone(phone: string): Promise<User>;
}
