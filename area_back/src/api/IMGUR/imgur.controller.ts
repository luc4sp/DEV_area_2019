import {Controller, UseGuards, Get, Body, HttpException, HttpStatus, Post, Param, Res} from '@nestjs/common';
import {ImgurService} from './imgur.service';
import {AuthGuard} from '@nestjs/passport';
import {Response} from "express";
import * as ServiceJson from "../../models/services/service.imgur.json";

@Controller('imgur')
export class ImgurController {
    constructor(private readonly imgurservice: ImgurService) {}

    @Get('/getreputation/:token')
    @UseGuards(AuthGuard())
    async GetReputation(@Param('token') tok: string) {
        try {
            const value = await this.imgurservice.getmyreputation(tok);
            return value;
        } catch (e) {
            throw new HttpException('No token', HttpStatus.BAD_REQUEST);
        }
    }
    @Get('/me/:token')
    @UseGuards(AuthGuard())
    async GetSettings(@Param('token') tok: string) {
        try {
            return await this.imgurservice.getSettings(tok);
        } catch (e) {
            throw new HttpException('Bad token', HttpStatus.BAD_REQUEST);
        }
    }
    @Post('/followtag/:name')
    @UseGuards(AuthGuard())
    async followtag(@Param('name') name: string, @Body('token') tok: string) {
        try {
            const value = await this.imgurservice.followTags(name, tok);
            return value;
        } catch (e) {
            throw new HttpException('No token', HttpStatus.BAD_REQUEST);
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