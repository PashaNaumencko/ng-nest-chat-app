import { Injectable } from '@nestjs/common';
import { UserRepository } from '../db/repositories/user.repository';
import { User } from '../db/entities/user.entity';
import { IUserResponse } from '../interfaces/IUserResponse';
import { CryptoHelper } from '../../shared/helpers/crypto.helper';
import { CreateUserDto } from '../dto/CreateUserDto';
import { IValidateResponse } from '../interfaces/IValidateResponse';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private cryptoHelper: CryptoHelper
  ) {}

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

  async addUser({ password, ...user }: CreateUserDto): Promise<User> {
    return this.userRepository.addUser({
      ...user,
      password: await this.cryptoHelper.hash(password)
    });
  }

  async isUsernameAlreadyTaken(username: string): Promise<IValidateResponse> {
    const user = await this.userRepository.getByUsername(username);

    return {
      isAvailable: !user
    }
  }

  async isEmailAlreadyTaken(email: string): Promise<IValidateResponse> {
    const user = await this.userRepository.getByEmail(email);

    return {
      isAvailable: !user
    }
  }
}
