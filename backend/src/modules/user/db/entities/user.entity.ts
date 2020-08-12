import { Entity, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../shared/abstract/abstract.entity';
import { RefreshToken } from '../../../auth/db/entities/refresh-token.entity';

@Entity()
export class User extends AbstractEntity {
  @Column({
    unique: true,
    nullable: false
  })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    unique: true,
    nullable: false
  })
  email: string;

  @Column({
    nullable: true
  })
  description: string;

  @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
  refreshTokens: RefreshToken[];
}
