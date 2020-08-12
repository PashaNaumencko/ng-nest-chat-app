import { EntityRepository, Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';
import { ICreateToken } from '../../interfaces/ICreateToken';
import { IRefreshTokenWithUser } from '../../interfaces/IRefreshTokenWithUser';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> {
  getById(id: string): Promise<IRefreshTokenWithUser> {
    return this.findOne({
      where: { id },
      relations: ['user']
    });
  }

  addToken(payload: ICreateToken): Promise<RefreshToken> {
    const token = this.create(payload);

    return token.save();
  }

  deleteToken(id: string): Promise<any> {
    return this.delete(id);
  }
}
