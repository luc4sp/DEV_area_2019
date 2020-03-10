import {Controller, Get, HttpException, HttpService, HttpStatus, UseGuards, Body, Res, Param} from '@nestjs/common';
import {WorldTimesApiService} from './world-times-api.service';
import {AuthGuard} from '@nestjs/passport';
import {Response} from 'express';
import * as ServiceJson from '../../models/services/service.world-times-api.json';

@Controller('world-times-api')
export class WorldTimesApiController {
    constructor(private readonly WorldTimesApi: WorldTimesApiService) {}

    @Get('/GetAllTimezone')
    @UseGuards(AuthGuard())
    async GetAllTimezone() {
        try {
            const value = await this.WorldTimesApi.getallTimezone();
            return  value;
        } catch (e) {
            throw new HttpException('Error get Timezone', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Get('/GetHoursFromTimezone/:Country')
    @UseGuards(AuthGuard())
    async GetHourFromCountry(@Param('Country') country: string) {
        try {
            const value = await this.WorldTimesApi.getHoursFromCountry(country);
            return value;
        } catch (e) {
            throw new HttpException('Timezone Error', HttpStatus.BAD_REQUEST);
        }
    }
    @Get('/GetHoursFromTimezone/:Country/:City')
    @UseGuards(AuthGuard())
    async GetHourFromZone(@Param('Country') country: string, @Param('City') city: string) {
        try {
            const value = await this.WorldTimesApi.getHoursFromReg(country, city);
            return value;
        } catch (e) {
            throw new HttpException('Timezone Error', HttpStatus.BAD_REQUEST);
        }
    }
    @Get('/GetHoursFromTimezone/:Country/:Reg/:city')
    @UseGuards(AuthGuard())
    async GetHourFromCity(@Param('Country') country: string, @Param('Reg') region: string, @Param('city') city: string) {
        try {
            const value = await this.WorldTimesApi.getHoursFromCity(country, region, city);
            return value;
        } catch (e) {
            throw new HttpException('Timezone Error', HttpStatus.BAD_REQUEST);
        }
    }
    @Get('/service')
    async getServiceTrello(@Res() res: Response) {
        try {
            res.status(HttpStatus.OK).json(ServiceJson);
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }
}
