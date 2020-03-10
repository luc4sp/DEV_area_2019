import { Module, HttpModule } from '@nestjs/common';
import { ApiService } from './api.service';
import { WorldTimesApiController } from './world-times-api/world-times-api.controller';
import { TrelloController } from './trello/trello.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models/user/users.entity';
import { WorldTimesApiService } from './world-times-api/world-times-api.service';
import { TrelloService } from './trello/trello.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_CONFIG } from '../config/app.config';
import {GithubController} from './github/github.controller';
import {GithubService} from './github/github.service';
import {SpotifyController} from './spotify/spotify.controller';
import {SpotifyService} from './spotify/spotify.service';
import {SlackController} from "./slack/slack.controller";
import {SlackService} from "./slack/slack.service";
import {ImgurController} from "./IMGUR/imgur.controller";
import {ImgurService} from "./IMGUR/imgur.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: APP_CONFIG.secretKey,
      signOptions: { algorithm: 'HS512', expiresIn: APP_CONFIG.expiresIn },
    }),
  ],
  controllers: [WorldTimesApiController, TrelloController, GithubController, SpotifyController, SlackController, ImgurController],
  providers: [ApiService, WorldTimesApiService, TrelloService, GithubService, SpotifyService, SlackService, ImgurService],
})
export class ApiModule {}
