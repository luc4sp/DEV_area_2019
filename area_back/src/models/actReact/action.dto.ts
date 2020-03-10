import { IsNotEmpty } from 'class-validator';
import { User } from '../user/users.entity';
import { Reaction } from './reaction.entity';
export class ActionDto {
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  apiCall?: string;

  @IsNotEmpty()
  body?: string;

  @IsNotEmpty()
  headers?: string;

  @IsNotEmpty()
  response?: string;

  @IsNotEmpty()
  user?: User;

  @IsNotEmpty()
  reaction?: Reaction;
}
