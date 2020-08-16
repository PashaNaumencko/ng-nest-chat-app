import { Entity, Column, ManyToOne, RelationId } from 'typeorm';
import { AbstractEntity } from '../../../shared/abstract/abstract.entity';
import { User } from '../../../user/db/entities/user.entity';

@Entity()
export class RefreshToken extends AbstractEntity {
  @Column({ type: 'bigint' })
  expiresAt: number;

  @ManyToOne(() => User, user => user.refreshTokens)
  user: User;

  @RelationId((token: RefreshToken) => token.user)
  readonly userId: string;
}
