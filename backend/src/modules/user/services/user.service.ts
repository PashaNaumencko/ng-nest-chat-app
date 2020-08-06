import { Injectable } from '@nestjs/common';
import { UserRepository } from '../db/repositories/user.repository';
import { User } from '../db/entities/user.entity';
import { IUserResponse } from '../interfaces/IUserResponse';
import { ICreateUser } from '../interfaces/ICreateUser';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getById(id: string): Promise<IUserResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userRepository.findOne({ id });
    return user;
  }

  getByUsername(username: string): Promise<User> {
    return this.userRepository.getByUsername(username);
  }

  getByEmail(email: string): Promise<User> {
    return this.userRepository.getByEmail(email);
  }

  async addUser({ password, ...user }: ICreateUser): Promise<User> {
    return this.userRepository.addUser({
      ...user,
      password: await hash(password, 10)
    });
  }
}
