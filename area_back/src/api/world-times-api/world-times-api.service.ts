import {HttpService, Injectable} from '@nestjs/common';
import {map} from 'rxjs/operators';

@Injectable()
export class WorldTimesApiService {
    constructor(private readonly httpService: HttpService) {}

    async getallTimezone(): Promise<any> {
        return this.httpService.get('http://worldtimeapi.org/api/timezone').pipe(map(response => response.data));
    }

    async getHoursFromCountry(country: string): Promise<any> {
        const urlApi: string = 'http://worldtimeapi.org/api/timezone/' + country
        return this.httpService.get(urlApi).pipe(map(response => response.data));
    }
    async getHoursFromReg(country: string, reg: string): Promise<any> {
        const urlApi: string = 'http://worldtimeapi.org/api/timezone/' + country + '/' + reg;
        return this.httpService.get(urlApi).pipe(map(response => response.data));
    }
    async getHoursFromCity(country: string, reg: string, city: string): Promise<any> {
        const urlApi: string = 'http://worldtimeapi.org/api/timezone/' + country + '/' + reg + city;
        return this.httpService.get(urlApi).pipe(map(response => response.data));
    }
}
