import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from '../models/auth/auth.signin.dto';
import { LoginDto } from '../models/auth/auth.login.dto';
import { JwtToken } from '../models/auth/jwt.token';
import { genTokenDto } from '../models/auth/auth.gentoken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('signin')
  async createUser(@Body() user: SigninDto): Promise<JwtToken> {
    try {
      return await this.authservice.register(user);
    } catch (err) {
      throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
    }
  }
  
  @Post('login')
  async logIn(@Body() user: LoginDto): Promise<JwtToken> {
    try {
      return await this.authservice.logIn(user);
    } catch (err) {
      throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('github')
  async logInGitHub() {
    try {
      return await this.authservice.logInwGithub();
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('postEmail')
  async validateByEmail(@Body() email: genTokenDto) {
    try {
      return await this.authservice.validateOauthByEmail(email);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
