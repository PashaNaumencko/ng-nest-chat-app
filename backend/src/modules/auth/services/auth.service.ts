import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { IAuth } from '../interfaces/IAuth';
import { CreateUserDto } from '../../user/dto/CreateUserDto';
import { TokenService } from './token.service';
import { IUserResponse } from 'src/modules/user/interfaces/IUserResponse';
import { RefreshTokenDto } from '../dto/RefreshTokenDto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  async login(user: IUserResponse): Promise<IAuth> {
    const tokens = await this.tokenService.generateTokens(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  async revokeToken(refreshTokenId: string): Promise<RefreshTokenDto> {
    const validToken = await this.tokenService.validateRefreshToken(refreshTokenId);
    await this.tokenService.deleteToken(validToken.id);
    return {
      refreshToken: refreshTokenId
    };
  }
}
