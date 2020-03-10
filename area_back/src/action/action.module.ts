import {HttpModule, HttpService, Module} from '@nestjs/common';
import { ActionController } from './action.controller';
import { ActionService } from './action.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Action } from '../models/actReact/action.entity';
import { AuthModule } from '../auth/auth.module';
import {ApiModule} from '../api/api.module';
import {GithubService} from '../api/github/github.service';
import {ImgurService} from '../api/IMGUR/imgur.service';
import {SpotifyService} from '../api/spotify/spotify.service';
import {TrelloService} from '../api/trello/trello.service';
import {SlackService} from '../api/slack/slack.service';

@Module({
  imports: [TypeOrmModule.forFeature([Action]), AuthModule, HttpModule, ApiModule],
  controllers: [ActionController],
  providers: [ActionService, GithubService, ImgurService, SpotifyService, TrelloService, SlackService],
  exports: [ActionService],
})
export class ActionModule {}
