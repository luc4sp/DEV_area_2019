import {HttpService, Injectable} from '@nestjs/common';
import { AxiosRequestConfig, Method } from 'axios';
import {map} from 'rxjs/operators';

@Injectable()
export class ImgurService {
    constructor(private readonly httpService: HttpService) {}

    async getmyreputation(tok: string) {
        const urlApi: string = 'https://api.imgur.com/3/account/me';
        const token: string = 'Bearer ' + tok;
        // tslint:disable-next-line:max-classes-per-file new-parens
        const conf: AxiosRequestConfig = new class implements AxiosRequestConfig {
            data: any;
            headers: any = {
                Authorization: token,
            };
            method: Method = 'GET';
            url: string = urlApi;
        };
        return this.httpService.get(urlApi, conf).pipe(map(response => response.data));
    }

    async getSettings(tok: string) {
        const urlApi: string = 'https://api.imgur.com/3/account/me/settings';
        const token: string = 'Bearer ' + tok;
        // tslint:disable-next-line:max-classes-per-file new-parens
        const conf: AxiosRequestConfig = new class implements AxiosRequestConfig {
            data: any;
            headers: any = {
                Authorization: token,
            };
            method: Method = 'GET';
            url: string = urlApi;
        };
        return this.httpService.get(urlApi, conf).pipe(map(response => response.data));
    }

    async followTags(name: string, tok: string) {
        const urlApi: string = `https://api.imgur.com/3/account/me/follow/tag/${name}`;
        const token: string = 'Bearer ' + tok;
        // tslint:disable-next-line:max-classes-per-file new-parens
        const conf: AxiosRequestConfig = new class implements AxiosRequestConfig {
            data: any;
            headers: any = {
                Authorization: token,
            };
            method: Method = 'POST';
            url: string = urlApi;
        };
        return this.httpService.post(urlApi, '' , conf).toPromise();
    }

}
