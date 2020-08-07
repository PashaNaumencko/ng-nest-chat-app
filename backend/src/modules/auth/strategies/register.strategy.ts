import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express'
import { UserService } from '../../user/services/user.service';
import { CreateUserDto } from '../../user/dto/CreateUserDto';

@Injectable()
export class RegisterStrategy extends PassportStrategy(Strategy, 'register') {
  constructor(
    private userService: UserService
  ) {
    super({
      passReqToCallback: true
    });
  }

  async validate({ body: { email } }: Request, username: string, password: string): Promise<CreateUserDto> {
    const userByUsername = await this.userService.getByUsername(username);
    if (userByUsername) {
      throw new UnauthorizedException('Username is already taken');
    }

    const userByEmail = await this.userService.getByEmail(email);
    if (userByEmail) {
      throw new UnauthorizedException('Email is already taken');
    }

    return {
      username,
      password,
      email
    };
  }
}
