import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../user/dto/CreateUserDto';
import { RefreshTokenService } from './refresh-token.service';
import { IRefreshToken } from '../interfaces/IRefreshToken';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService
  ) {}


  async login(id: string): Promise<IAuthResponse> {
    const user = await this.userService.getById(id);
    const accessToken = await this.jwtService.signAsync({ id });
    const refreshToken = await this.refreshTokenService.generateRefreshToken(user);

    return {
      user,
      accessToken,
      refreshToken
    };
  }

  async register(data: CreateUserDto): Promise<IAuthResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.addUser(data);

    return this.login(user.id)
  }


  async refreshTokens(refreshTokenId: string): Promise<IAuthResponse> {
    const validToken = await this.refreshTokenService.validateRefreshToken(refreshTokenId);
    await this.revokeToken(refreshTokenId);
    return this.login(validToken.user.id);
  }

  async revokeToken(refreshTokenId: string): Promise<IRefreshToken> {
    const validToken = await this.refreshTokenService.validateRefreshToken(refreshTokenId);
    await this.refreshTokenService.deleteToken(validToken.id);
    return {
      refreshToken: refreshTokenId
    };
  }
}
