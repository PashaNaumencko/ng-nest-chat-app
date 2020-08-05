import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../../common/abstract/abstract.entity';

@Entity()
export class User extends AbstractEntity {
  @Column({
    unique: true,
    nullable: false
  })
  username: string;

  @Column({ nullable: false })
  passwordHash?: string;

  @Column({
    unique: true,
    nullable: false
  })
  email: string;

  @Column({
    nullable: true
  })
  description: string;
}
