import { User } from '../user';

export interface UserStore {
  store(user: User): Promise<User>;
}
