import {HttpService, Injectable} from '@nestjs/common';
import {map} from "rxjs/operators";

@Injectable()
// @ts-ignore
export class SlackService {
    constructor(private readonly httpService: HttpService) {}

    async list_conversation(tok: string) {
        const urlApi: string = 'https://api.slack.com/api/conversations.list?token=' + tok;
        return this.httpService.get(urlApi).pipe(map(response => response.data));
    }
    async create_channel(tok: string, name: string) {
        const urlApi: string = 'https://api.slack.com/api/channels.create?token=' + tok + '&name=' + name;
        return this.httpService.post(urlApi).toPromise();
    }
}