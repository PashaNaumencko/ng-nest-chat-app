import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { IAuth } from '../interfaces/IAuth';
import { CreateUserDto } from '../../user/dto/CreateUserDto';
import { TokenService } from './token.service';
import { IRefreshToken } from '../interfaces/IRefreshToken';
import { IUserResponse } from 'src/modules/user/interfaces/IUserResponse';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  async login(user: IUserResponse): Promise<IAuth> {
    const tokens = await this.tokenService.generateTokens(user);

    return { ...tokens, user };
  }

  async register(data: CreateUserDto): Promise<IAuth> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.addUser(data);

    return this.login(user);
  }

  async refreshTokens(encryptedRefreshToken: string): Promise<IAuth> {
    const refreshToken = await this.tokenService.validateRefreshToken(encryptedRefreshToken);
    const currentUser = await this.userService.getById(refreshToken.userId);
    const tokens = await this.tokenService.generateTokens(currentUser);

    return tokens;
  }

  async revokeToken(refreshTokenId: string): Promise<IRefreshToken> {
    const validToken = await this.tokenService.validateRefreshToken(refreshTokenId);
    await this.tokenService.deleteToken(validToken.id);
    return {
      refreshToken: refreshTokenId
    };
  }
}
