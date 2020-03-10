import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from './config/database.config';
import { User } from './models/user/users.entity';
import { AuthModule } from './auth/auth.module';
import { ApiModule } from './api/api.module';
import { Action } from './models/actReact/action.entity';
import { ActionModule } from './action/action.module';
import { ReactionModule } from './reaction/reaction.module';
import { Reaction } from './models/actReact/reaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...DATABASE_CONFIG, entities: [User, Action, Reaction] }),
    UsersModule,
    AuthModule,
    ApiModule,
    ActionModule,
    ReactionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
