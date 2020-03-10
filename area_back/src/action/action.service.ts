import {HttpException, HttpService, HttpStatus, Injectable} from '@nestjs/common';
import { ActionDto } from '../models/actReact/action.dto';
import { Action } from '../models/actReact/action.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from '../models/actReact/reaction.entity';
import {map} from 'rxjs/operators';
import * as console from 'console';
import {GithubService} from '../api/github/github.service';
import {ImgurService} from '../api/IMGUR/imgur.service';
import {SlackService} from '../api/slack/slack.service';
import {SpotifyService} from '../api/spotify/spotify.service';
import {TrelloService} from '../api/trello/trello.service';
import { AxiosRequestConfig, Method } from 'axios';
import {url} from 'inspector';

@Injectable()
export class ActionService {
    // tslint:disable-next-line:prefer-const
    private value: any;
    // tslint:disable-next-line:max-line-length
    constructor(@InjectRepository(Action) public readonly actionRepository: Repository<Action>, private readonly githubService: GithubService, private readonly imgurService: ImgurService, private readonly slackService: SlackService, private readonly spotifyService: SpotifyService, private readonly trelloService: TrelloService, private httpService: HttpService) {}

    async postActions(actions: ActionDto): Promise<Action> {
        const data: ActionDto = {
            ...actions,
        };
        if (!data) {
            throw new Error('bad data');
        }
        return await this.actionRepository.save(data);
    }

    async getActions(): Promise<Action[]> {
        const data = await this.actionRepository.find();
        if (!data) {
            throw new Error('no actions to show');
        }
        return data;
    }

    async getActionsFromUser(userId: number): Promise<Action[]> {
        const data = await this.actionRepository.find({ relations: ['user'], where: [{ user: userId }], order: { id: 'ASC' } });
        if (!data) {
            throw new Error('no actions for this user');
        }
        return data;
    }

    async getActionById(id: number): Promise<Action> {
        const data = await this.actionRepository.findOne(id);
        if (!data) {
            throw new Error('no action with this id');
        }
        return data;
    }

    async getAllReactionsFromUser(idUser: number): Promise<Reaction[]> {
        const data = await this.actionRepository.find({ relations: ['reaction'], where: [{ user: idUser }] });
        if (!data) {
            throw new Error('no reactions for this user');
        }
        return data;
    }

    async getAllReactions(): Promise<Reaction[]> {
        const data = await this.actionRepository.find({ relations: ['reaction'] });
        if (!data) {
            throw new Error('no reactions to show');
        }
        return data;
    }

    async deleteActById(actionId: number) {
        const data = await this.actionRepository.findOne(actionId);
        if (!data) {
            throw new Error('no Action with this ID');
        }
        const deletedEntity = await this.actionRepository.delete(actionId);
        return deletedEntity;
    }

    async getUserByActId(actionId: number) {
        const data = await this.actionRepository.find({ relations: ['user'], where: [{ id: actionId }], order: { id: 'ASC' } });
        if (!data) {
            throw new Error('no user with this action_id');
        }
        return data;
    }

    async check_reaction(data: Reaction): Promise<any> {
        // @ts-ignore
        const url = data.reaction.apiCall.split('/');
        // @ts-ignore
        const body = JSON.parse(data.reaction.body);
        // @ts-ignore
        switch (data.reaction.name) {
            case 'Put a stars on a repository':
                // @ts-ignore
                await this.githubService.PutStars(url[4], url[5], body.token);
                break;
            case 'Delete a stars on a repository':
                // @ts-ignore
                await this.githubService.deleteStars(url[4], url[5], body.token);
                break;
            case 'Watch a repository':
                // @ts-ignore
                await this.githubService.putWatch(url[4], url[5], body.token);
                break;
            case 'Delete a Watch on a repository':
                // @ts-ignore
                await this.githubService.deleteWatch(url[4], url[5], body.token);
                break;
            case 'Create a project':
                break;
            case 'Delete a project':
                break;
            case 'Create a repository':
                break;
            case 'Delete a repository':
                break;
            case 'Create a fork':
                // @ts-ignore
                await this.githubService.putFork(url[4], url[5], body.token);
                break;
            case 'Create a board':
                await this.trelloService.Create_Boards(body.name, body.token, body.oauth);
                break;
            case 'Create a card':
                await this.trelloService.Create_Cards(body.name, body.ID, body.token, body.oauth);
                break;
            case 'Create a new list':
                await this.trelloService.Create_list(body.name, body.ID, body.token, body.oauth);
                break;
            case 'Follow a User or Artist':
                await this.spotifyService.Follow(body.type, body.name, body.token);
                break;
            case 'Create a convo':
                await this.slackService.create_channel(body.token, body.name);
                break;
            case 'Follow Tags':
                await this.imgurService.followTags(body.name, body.token);
                break;
        }
        return ;
    }

    async github_action(data: Reaction): Promise<any> {
        // tslint:disable-next-line:variable-name
        const splitted_tab = data.apiCall.split('/');
        const urlapi: string = 'https://api.github.com/repos/' + splitted_tab[4] + '/' + splitted_tab[5];
        const p = this.httpService.get(urlapi).subscribe(async res => {
            this.value = res;
            // @ts-ignore
            const resp = JSON.parse(data.response);
            switch (data.name) {
                case 'New stars on repository':
                    if (resp.data.stargazers_count != res.data.stargazers_count) {
                        // @ts-ignore
                        await this.check_reaction(data);
                        break;
                    }
                    break;
                case 'New watchers on repository':
                    if (resp.watchers_count != res.data.watchers_count) {
                        // @ts-ignore
                        await this.check_reaction(data);
                        break;
                    }
                    break;
                case 'New open_issues on specified repository':
                    if (resp.open_issues != res.data.open_issues) {
                        // @ts-ignore
                        await this.check_reaction(data);
                        break;
                    }
                    break;
                case 'New Forks on specified repository':
                    if (resp.forks != res.data.forks) {
                        // @ts-ignore
                        this.check_reaction(data);
                        break;
                    }
                    break;
                case 'New Collaborator':
                    if (resp.subscribers_count != res.data.subscribers_count) {
                        // @ts-ignore
                        await this.check_reaction(data);
                        break;
                    }
                    break;
                case 'fork on a repository':
                    if (resp.forks != res.data.forks) {
                        // @ts-ignore
                        await this.check_reaction(data);
                        break;
                    }
                    break;
            }
            return res;
        });
    }
    async imgur_action(data: Reaction) {
        const urlApi: string = 'https://api.imgur.com/3/account/me';
        // @ts-ignore
        const resp = JSON.parse(data.response);
        const p = this.httpService.get(urlApi).subscribe(async res => {
            // @ts-ignore
            if (resp.data.reputation != res.data.reputation) {
                await this.check_reaction(data);
            }
        });
        return ;
    }

    async slack_action(data: Reaction) {
        // @ts-ignore
        const res = JSON.parse(data.response);
        const body = JSON.parse(data.body);
        const urlApi: string = 'https://api.slack.com/api/conversations.list?token=' + body.token;
        try {
            const p = this.httpService.get(urlApi).subscribe(res => res.data);
            // @ts-ignore
            // tslint:disable-next-line:no-shadowed-variable
            console.log(p.data);
            let buf = 0;
            let buf1 = 0;
            let i = 0;
            // @ts-ignore
            while (res.data.channels[i]) {
                // @ts-ignore
                i++;
                buf1++;
            }
            console.log(buf1);
            i = 0;
            // @ts-ignore
            while (resp.data.channels[i]) {
                // @ts-ignore
                buf++;
                i++;
            }
            i = 0;
            // @ts-ignore
            if (buf !== buf1) {
                this.check_reaction(data);
            }
            return p;
        } catch (e) {
            return ;
        }
        // });
    }

    async spotify_action(data: Reaction) {
        let urlApi: string = 'https://api.spotify.com/v1/';
        const body = JSON.parse(data.body);
        // @ts-ignore
        const resp = JSON.parse(data.response);
        // tslint:disable-next-line:new-parens max-classes-per-file
        const conf: AxiosRequestConfig = new class implements AxiosRequestConfig {
            data: any;
            headers: any = {
                Authorization: `Bearer ${body.token}`,
            };
            method: Method = 'GET';
        };
        switch (data.name) {
            case 'New Follower on Me':
                urlApi = urlApi + 'me';
                const p = this.httpService.get(urlApi, conf).subscribe(async res => {
                    if (res.data.followers.total != resp.data.followers.total) {
                        this.check_reaction(data);
                    }
                });
                break;
            case 'New Follower on Artist':
                urlApi = urlApi + '/search?q=' + body.name + '&type=artist';
                const pt = this.httpService.get(urlApi, conf).subscribe(async res => {
                    if (res.data.artists[0].followers.total != resp.data.artists[0].followers.total) {
                        this.check_reaction(data);
                    }
                });
        }
        return ;
    }

    async trello_action(data: Reaction) {
        let urlApi: string = 'https://api.trello.com/1/';
        const splitted_tab = data.apiCall.split('/');
        let buf = 0;
        let buf1 = 0;
        let i = 0;
        const body = JSON.parse(data.body);
        // @ts-ignore
        const res = JSON.parse(data.response);
        switch (data.name) {
            case 'New Board':
                urlApi = urlApi + 'members/' + splitted_tab[5];
                urlApi = urlApi + '/boards?filter=all&key=' + body.token + '&token=' + body.oauth;
                console.log(urlApi);
                const pisse = this.httpService.get(urlApi).subscribe(async resp_board => {
                    while (res.data[i]) {
                        i++;
                        buf1++;
                    }
                    console.log(buf1);
                    i = 0;
                    while (resp_board.data[i]) {
                        i++;
                        buf++;
                    }
                    console.log(buf);
                    i = 0;
                    if (buf !== buf1) {
                        console.log('need a reaction');
                        await this.check_reaction(data);
                    }
                    return resp_board;
                });
                break;
            case 'New Card':
                urlApi = urlApi + 'lists/' + body.ID + '/cards/?fields=name%2CidBoard&key' + body.token + '&token=' + body.oauth;
                const passe = this.httpService.get(urlApi).subscribe(async resp_card => {
                    while (resp_card.data[i]) {
                        i++;
                        buf++;
                    }
                    i = 0;
                    console.log(buf);
                    while (res.data[i]) {
                        i++;
                        buf1++;
                    }
                    i = 0;
                    console.log(buf1);
                    if (buf !== buf1) {
                        await this.check_reaction(data);
                    }
                });
                break;
            case 'New list':
                urlApi = urlApi + '/boards/' + body.token + '?filter=all&lists=open&key=' + body.token + '&token=' + body.oauth;
                const p = this.httpService.get(urlApi).subscribe(async resp_list => {
                    console.log(resp_list.data);
                    while (resp_list.data.lists[i]) {
                        i++;
                        buf++;
                    }
                    i = 0;
                    while (res.data.lists[i]) {
                        buf1++;
                        i++;
                    }
                    i = 0;
                    console.log(buf);
                    console.log(buf1);
                    if (buf !== buf1) {
                        await this.check_reaction(data);
                    }
                });
                break;
        }
        return ;
    }

    async check_action(data: Reaction) {
        switch (data.headers) {
            case 'github':
                try {
                    const tmp = await this.github_action(data);
                    break;
                } catch (e) {
                    throw new Error('Error');
                }
            case 'imgur':
                try {
                    await this.imgur_action(data);
                    break;
                } catch (e) {
                    throw new Error('Error');
                }
            case 'slack':
                try {
                    await this.slack_action(data);
                    break;
                } catch (e) {
                    throw new Error('Error');
                }
            case 'spotify':
                try {
                    await this.spotify_action(data);
                    break;
                } catch (e) {
                    throw new Error('Error');
                }
            case 'trello':
                try {
                    await this.trello_action(data);
                    break;
                } catch (e) {
                    throw new Error('Error');
                }
        }
        return ;
    }

    async updateOneByActionId(actionId: number, act: ActionDto): Promise<Action> {
        const action = await this.getActionById(actionId);
        if (!action) {
            throw new Error('no action with this ID');
        }
        const payloadAction: ActionDto = {
            response: act.response || action.response,
        };
        const upd = await this.actionRepository.update(actionId, payloadAction);
        if (!upd) {
            throw new Error('error');
        }
        return await this.actionRepository.findOne(actionId);
    }
}
