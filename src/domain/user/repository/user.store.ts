import { User } from '../entity/user';

export interface UserStore {
  store(user: User): Promise<User>;
}
