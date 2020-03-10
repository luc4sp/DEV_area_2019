import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../user/users.entity';
import { Reaction } from './reaction.entity';

@Entity()
export class Action {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  apiCall?: string;

  @Column()
  body?: string;

  @Column()
  headers?: string;

  @Column({ nullable: true })
  response?: string;

  @ManyToOne(() => User, user => user.id)
  user?: User;

  @OneToOne(() => Reaction, { cascade: true })
  @JoinColumn()
  reaction?: Reaction;
}
