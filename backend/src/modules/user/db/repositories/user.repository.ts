import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { ICreateUser } from '../../interfaces/ICreateUser';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  getByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }

  getByUsername(username: string): Promise<User> {
    return this.findOne({ username });
  }

  addUser(data: ICreateUser): Promise<User> {
    const user = this.create(data);

    return user.save();
  }
}
