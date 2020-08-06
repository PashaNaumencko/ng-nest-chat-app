import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { JwtService } from '@nestjs/jwt';
import { ICreateUser } from '../../user/interfaces/ICreateUser';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(id : string): Promise<IAuthResponse> {
    const user = await this.userService.getById(id);
    const token = this.jwtService.sign({ id });

    return { token, user }
  }

  async register(data: ICreateUser): Promise<IAuthResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.addUser(data);

    return this.login(user.id)
  }
}
