import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Action } from './action.entity';

@Entity()
export class Reaction {
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
}
