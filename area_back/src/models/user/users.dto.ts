import { Allow, IsEmail, IsNotEmpty } from 'class-validator';
export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  firstName?: string;

  @IsNotEmpty()
  lastName?: string;

  @Allow()
  isAdmin?: boolean;
}
