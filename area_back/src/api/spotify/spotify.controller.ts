import {Body, Controller, Get, HttpException, HttpStatus, Param, Put, Res, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {SpotifyService} from './spotify.service';
import {Response} from 'express';
import * as ServiceJson from '../../models/services/service.spotify.json';

@Controller('spotify')
export class SpotifyController {
    constructor(private readonly Spotifyservice: SpotifyService) {};
    @Get('/me/:token')
    @UseGuards(AuthGuard())
    async Get_Data_for_my_account(@Param('token') tok: string) {
        try {
            const value = await this.Spotifyservice.GetDataForMyUser(tok);
            return value;
        } catch (e) {
            throw new HttpException('Bad token', HttpStatus.BAD_REQUEST)
        }
    }
    @Get('/search/:artist_name/:token')
    @UseGuards(AuthGuard())
    async search_artist_and_get_id(@Param('artist_name') artist: string ,@Param('token') tok: string) {
        try {
            console.log(artist, tok);
            const value = await this.Spotifyservice.GetIDForArtist(artist, tok);
            console.log(value);
            return value;
        } catch (e) {
            throw new HttpException('Bad token or artist', HttpStatus.BAD_REQUEST);
        }
    }

    @Put('/folow/:type/:username')
    @UseGuards(AuthGuard())
    async Follow_Someone(@Param('type') artist: string , @Param('username') username: string, @Body('token') tok: string) {
        try {
            const value = await this.Spotifyservice.Follow(artist, username, tok);
            return value;
        } catch (e) {
            throw new HttpException('Bad token or artist', HttpStatus.BAD_REQUEST);
        }
    }


    @Get('/service')
    @UseGuards(AuthGuard())
    async getServiceGithub(@Res() res: Response) {
        try {
            res.status(HttpStatus.OK).json(ServiceJson);
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }
}