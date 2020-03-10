import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class OauthDto {
    @IsNotEmpty()
    email?: string;
    @IsNotEmpty()
    client_id?: string;
}
