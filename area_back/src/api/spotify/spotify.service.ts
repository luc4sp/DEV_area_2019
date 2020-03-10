import {HttpService, Injectable} from "@nestjs/common";
import {map} from "rxjs/operators";

class AxiosRequestConfig {
}

class Method {
}

@Injectable()
export class SpotifyService {
    constructor(private readonly httpService: HttpService) {}

    async GetDataForMyUser(tok: string): Promise<any> {
        const urlApi: string = 'https://api.spotify.com/v1/me';
        const token: string = 'Bearer ' + tok;
        // tslint:disable-next-line:new-parens max-classes-per-file
        const conf: AxiosRequestConfig = new class implements AxiosRequestConfig {
            data: any;
            headers: any = {
                Authorization: token,
            };
            method: Method = 'GET';
            url: string = urlApi;
        }
        return this.httpService.get(urlApi, conf).pipe(map(response => response.data));
    }

    async GetIDForArtist(artist: string, tok: string): Promise<any> {
        const urlApi: string = 'https://api.spotify.com/v1/search?q=' + artist + '&type=artist';
        const token: string = 'Bearer ' + tok;
        // tslint:disable-next-line:new-parens max-classes-per-file
        const conf: AxiosRequestConfig = new class implements AxiosRequestConfig {
            data: any;
            headers: any = {
                Authorization: token,
            };
            method: Method = 'GET';
            url: string = urlApi;
        }
        return this.httpService.get(urlApi, conf).pipe(map(response => response.data));
    }
    async Follow(typeUser: string, username: string, tok: string): Promise<any> {
        const urlApi: string = 'https://api.spotify.com/v1/me/following';
        const token: string = 'Bearer ' + tok;
        // tslint:disable-next-line:new-parens max-classes-per-file
        const conf: AxiosRequestConfig = new class implements AxiosRequestConfig {
            data: any;
            headers: any = {
                Authorization: token,
            };
            params: any = {
                type: typeUser,
                ids: username,
            };
            method: Method = 'PUT';
            url: string = urlApi;
        }
        return this.httpService.put(urlApi, '' , conf).toPromise();
    }
}