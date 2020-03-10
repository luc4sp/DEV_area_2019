import './trello.controller';
import {HttpService, Injectable} from '@nestjs/common';
import {map} from 'rxjs/operators';
import { AxiosRequestConfig , Method} from 'axios';

@Injectable()
export class TrelloService {
    constructor(private readonly httpService: HttpService) {}

    async getAllBoards(username: string, key: string, oauth: string): Promise<any> {
        const urlApi: string = 'https://api.trello.com/1/members/' + username + '/boards?filter=all&key=' + key + '&token=' + oauth;
        const value = this.httpService.get(urlApi).pipe(map(response => response.data));
        return value;
    }

    async get_list_from_ID_board(id: string, key: string, oauth: string): Promise<any> {
        const urlApi: string = 'https://api.trello.com/1/boards/' + id + '?filter=all&lists=open&key=' + key + '&token=' + oauth;
        console.log(urlApi);
        return this.httpService.get(urlApi).pipe(map(response => response.data));
    }
    async get_nbr_of_cards_idList(id: string, key: string, oauth: string): Promise<any> {
        const urlApi: string = 'https://api.trello.com/1/lists/' + id + '/cards/?fields=name%2CidBoard&key=' + key + '&token=' + oauth;
        console.log(urlApi);
        return this.httpService.get(urlApi).pipe(map(response => response.data));
    }

    async Create_Cards(name: string, idList: string, apiKey: string, oauthToken: string): Promise<any> {
        const urlApi: string = 'https://api.trello.com/1/cards?name=' + name + '&idList=' + idList + '&key=' + apiKey + '&token=' + oauthToken;
        console.log(urlApi);
        return this.httpService.post(urlApi).toPromise();
    }

    async Create_Boards(name: string, apiKey: string, oauthToken: string): Promise<any> {
        const urlApi: string = 'https://api.trello.com/1/boards/?name=' +  name + '&key=' + apiKey + '&token=' + oauthToken;
        console.log(urlApi);
        return this.httpService.post(urlApi).toPromise();
    }

    async Create_list(name: string, idList: string, apiKey: string, oauthToken: string): Promise<any> {
        const urlApi: string = 'https://api.trello.com/1/lists?name=' + name + '&idBoard=' + idList + '&key=' + apiKey + '&token=' + oauthToken;
        console.log(urlApi);
        return this.httpService.post(urlApi).toPromise();
    }
}