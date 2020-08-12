import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { CryptoHelper } from '../../shared/helpers/crypto.helper';
import { IUser } from '../../user/interfaces/IUser';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy, 'login') {
  constructor(
    private userService: UserService,
    private cryptoHelper: CryptoHelper
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<IUser> {
    const user = await this.userService.getByUsername(username);
    if(!user) {
      throw new UnauthorizedException('The username/password combination is invalid');
    }
    const isPasswordValid = await this.cryptoHelper.compare(password, user.password);

    if(!isPasswordValid) {
      throw new UnauthorizedException(`Passwords don't match`);
    }

    return user;
  }
}
