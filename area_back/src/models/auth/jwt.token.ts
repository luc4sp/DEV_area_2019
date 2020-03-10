import { User } from '../user/users.entity';

export class JwtToken {
  token: string;
  expireDate: number;
  user?: User;
}
