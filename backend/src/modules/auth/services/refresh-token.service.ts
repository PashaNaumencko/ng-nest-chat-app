import { IUserResponse } from '../../user/interfaces/IUserResponse';
import { RefreshTokenRepository } from '../db/repositories/refresh-token.repository';
import { CryptoHelper } from '../../shared/helpers/crypto.helper';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshToken } from '../db/entities/refresh-token.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    private refreshTokenRepository: RefreshTokenRepository,
    private cryptoHelper: CryptoHelper
  ) {}

  async generateRefreshToken(user: IUserResponse): Promise<string> {
    const currentDate = new Date();
    const expiresAt = currentDate.setDate(currentDate.getMinutes() + 3);
    const { id } = await this.refreshTokenRepository.addToken({
      user,
      expiresAt
    });
    const ecryptedToken = this.cryptoHelper.encrypt(id);
    return ecryptedToken;
  }

  async validateRefreshToken(tokenId: string): Promise<RefreshToken> {
    const refreshTokenId = this.cryptoHelper.decrypt(tokenId);
    const token = await this.getById(refreshTokenId);

    if(!token) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if(Date.now() > token.expiresAt) {
      await this.deleteToken(token.id);
      throw new UnauthorizedException('Expired refresh token');
    }

    return token;
  }

  getById(id: string): Promise<RefreshToken> {
    return this.refreshTokenRepository.getById(id);
  }

  deleteToken(id: string): Promise<RefreshToken> {
    return this.refreshTokenRepository.deleteToken(id);
  }
}
