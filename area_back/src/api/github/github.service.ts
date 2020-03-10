import {HttpService, Injectable, Put} from '@nestjs/common';
import {map} from 'rxjs/operators';
import { AxiosRequestConfig, AxiosTransformer, AxiosProxyConfig, Method, CancelToken, AxiosBasicCredentials, AxiosAdapter } from 'axios';
import {url} from "inspector";

@Injectable()
export class GithubService {
    constructor(private readonly httpService: HttpService) {}

    async GetdataFromUsername(username: string): Promise<any> {
        const urlApi: string = 'http://api.github.com/users/' + username;
        return this.httpService.get(urlApi).pipe(map(response => response.data));
    }

    async GetRepositoryList(username: string): Promise<any> {
        const urlApi: string = 'http://api.github.com/users/' + username + '/repos?per_page=100';
        return this.httpService.get(urlApi).pipe(map(response => response.data));
    }

    async GetSpecificRepository(username: string, reponame: string): Promise<any> {
        const urlApi: string = 'http://api.github.com/repos/' + username + '/' + reponame;
        return this.httpService.get(urlApi).pipe(map(response => response.data));
    }

    async SearchRepository(reponame: string): Promise<any> {
        const urlApi: string = 'http://api.github.com/search/repositories?q=' + reponame;
        console.log(urlApi);
        return this.httpService.get(urlApi).pipe(map(response => response.data));
    }

    async PutStars(username: string, repoName: string, tok: string): Promise<any> {
        const urlApi: string = 'https://api.github.com/user/starred/' + username + '/' + repoName;
        console.log(urlApi);
        const token: string = 'token ' + tok;
        // tslint:disable-next-line:max-classes-per-file new-parens
        const conf: AxiosRequestConfig = new class implements AxiosRequestConfig {
            data: any;
            headers: any = {
                Authorization: token,
            };
            method: Method = 'PUT';
            url: string = urlApi;
        };
        // @ts-ignore
        return this.httpService.put(urlApi, '', conf).toPromise();
    }
    async deleteStars(username: string, repoName: string, tok: string): Promise<any> {
        const urlApi: string = 'https://api.github.com/user/starred/' + username + '/' + repoName;
        const token: string = 'token ' + tok;
        // tslint:disable-next-line:max-classes-per-file new-parens
        const conf: AxiosRequestConfig = new class implements AxiosRequestConfig {
            data: any;
            headers: any = {
                Authorization: token,
            };
            method: Method = 'DELETE';
            url: string = urlApi;
        };
        return this.httpService.delete(urlApi, conf).toPromise();
    }

    async putWatch(username: string, repoName: string, tok: string): Promise<any> {
        const urlApi: string = 'https://api.github.com/repos/' + username + '/' + repoName + '/subscription';
        const token: string = 'token ' + tok
        // tslint:disable-next-line:max-classes-per-file new-parens
        const conf: AxiosRequestConfig = new class implements AxiosRequestConfig {
            data: any;
            headers: any = {
                Authorization: token,
            };
            method: Method = 'PUT';
            url: string = urlApi;
        };
        // @ts-ignore
        return this.httpService.put(urlApi, '', conf).toPromise();
    }

    async deleteWatch(username: string, repoName: string, tok: string): Promise<any> {
        const urlApi: string = 'https://api.github.com/repos/' + username + '/' + repoName + '/subscription';
        const token: string = 'token ' + tok
        // tslint:disable-next-line:max-classes-per-file new-parens
        const conf: AxiosRequestConfig = new class implements AxiosRequestConfig {
            data: any;
            headers: any = {
                Authorization: token,
            };
            method: Method = 'DELETE';
            url: string = urlApi;
        };
        // @ts-ignore
        return this.httpService.delete(urlApi, conf).toPromise();
    }

    async putFork(username: string, repoName: string, tok: string): Promise<any> {
        const urlApi: string = 'https://api.github.com/repos/' + username + '/' + repoName + '/forks';
        const token: string = 'token ' + tok
        // tslint:disable-next-line:max-classes-per-file new-parens
        const conf: AxiosRequestConfig = new class implements AxiosRequestConfig {
            data: any;
            headers: any = {
                Authorization: token,
            };
            method: Method = 'POST';
            url: string = urlApi;
        };
        // @ts-ignore
        return this.httpService.post(urlApi, '', conf).toPromise();
    }

}
