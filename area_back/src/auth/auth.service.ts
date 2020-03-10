import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../models/user/users.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../models/auth/auth.login.dto';
import { JwtToken } from '../models/auth/jwt.token';
import { JwtPayload } from '../models/auth/jwt.payload';
import { JwtService } from '@nestjs/jwt';
import { APP_CONFIG } from '../config/app.config';
import { map } from 'rxjs/operators';
import { genTokenDto } from '../models/auth/auth.gentoken.dto';
import { UserDto } from '../models/user/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userservice: UsersService,
    private jwtService: JwtService,
    private readonly httpService: HttpService
  ) {}

  async register(userClearPwd: User): Promise<JwtToken> {
    const newUser: User = {
      ...userClearPwd,
      email: userClearPwd.email.toLowerCase(),
    };
    newUser.salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(userClearPwd.password, newUser.salt);

    const emailAlreadyExists = await this.userservice.findOneByEmail(
      userClearPwd.email,
    );
    if (emailAlreadyExists) {
      throw new Error('This email already exist');
    }

    const createdUser: User = await this.userservice.userRepository.save(
      newUser,
    );
    return this.createJwtPayload(createdUser);
  }

  async logIn(user: LoginDto): Promise<JwtToken> {
    const userFound = await this.validateUserByPassword(user);
    return this.createJwtPayload(userFound);
  }

  private async validateUserByPassword(user: LoginDto): Promise<User> {
    user.email = user.email.toLowerCase();
    const userToCheck = await this.userservice.findOneSaltByEmail(user.email);
    if (!userToCheck) {
      throw new Error('Wrong email or password');
    }
    const hashedPassword = await bcrypt.hash(user.password, userToCheck.salt);
    return this.userservice.findMatchEmailPassword(user.email, hashedPassword);
  }

  async validateUserByJwt(payload: JwtPayload) {
    const user = await this.userservice.findOneByEmail(payload.email);
    return this.createJwtPayload(user);
  }

  createJwtPayload(user: User): JwtToken {
    const data: JwtPayload = {
      email: user.email,
    };
    const jwt = this.jwtService.sign(data);
    return {
      token: jwt,
      expireDate: new Date(Date.now() + APP_CONFIG.expiresIn * 1000).valueOf(),
      user,
    };
  }

  async logInwGithub() {
    const ret = this.httpService.get('https://github.com/login/oauth/authorize').pipe(map(response => response.data));
    return ret;
  }

  async verifyClient(user: UserDto, client_id: string): Promise<JwtToken> {
    const client = {
      github: 'Iv1.6550254c46078825',
      githubMobile: 'Iv1.ab9857810b96e777',
      trello: 'fef0bdde564ccc25ae62'
    };
    if (client_id == client.github || client_id == client.githubMobile || client_id == client.trello) {
      return this.createJwtPayload(user);
    } else {
      throw new Error('bad client');
    }
  }

  async validateOauthByEmail(user: genTokenDto): Promise<JwtToken> {
    const client = {
      github: 'Iv1.6550254c46078825',
      githubMobile: 'Iv1.ab9857810b96e777',
      trello: 'fef0bdde564ccc25ae62'
    };
    if (user.client_id == client.github || user.client_id == client.githubMobile || user.client_id == client.trello) {
      const newUser: UserDto = {
        ...user,
        email: user.email
      };
      const emailAlreadyExists = await this.userservice.findOneByEmail(newUser.email);
      if (emailAlreadyExists) {
        const data = await this.verifyClient(emailAlreadyExists, user.client_id);
        return data;
      }
      const createdUser: User = await this.userservice.userRepository.save(newUser);
      return this.createJwtPayload(createdUser);
    } else {
      throw new Error('bad client');
    }
  }
}
