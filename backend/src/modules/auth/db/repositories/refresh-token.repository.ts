import { EntityRepository, Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';
import { ICreateToken } from '../../interfaces/ICreateToken';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> {
  getById(id: string): Promise<RefreshToken> {
    return this.findOne({ id });
  }

  addToken(payload: ICreateToken): Promise<RefreshToken> {
    const token = this.create(payload);

    return token.save();
  }

  deleteToken(id: string): Promise<any> {
    return this.delete(id);
  }
}
