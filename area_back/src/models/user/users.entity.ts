import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Action } from '../actReact/action.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true }) firstName?: string;

  @Column({ nullable: true }) lastName?: string;

  @Column() email?: string;

  @Column({ select: false, nullable: true })
  password?: string;

  @Column({ select: false, nullable: true })
  salt?: string;

  @Column({ default: false, nullable: true })
  isAdmin?: boolean;

  @OneToMany(() => Action, action => action.user)
  action?: Action[];
}
