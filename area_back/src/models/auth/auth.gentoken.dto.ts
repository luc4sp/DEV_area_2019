import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class genTokenDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  client_id: string;
}