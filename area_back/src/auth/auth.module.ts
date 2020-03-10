import { Module, HttpModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models/user/users.entity';
import { UsersService } from '../users/users.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { APP_CONFIG } from '../config/app.config';
import { Action } from '../models/actReact/action.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Action]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: APP_CONFIG.secretKey,
      signOptions: { algorithm: 'HS512', expiresIn: APP_CONFIG.expiresIn },
    }),
    HttpModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
