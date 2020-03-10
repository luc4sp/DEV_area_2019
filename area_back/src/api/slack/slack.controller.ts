import {Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res, UseGuards} from "@nestjs/common";
import {SlackService} from "./slack.service";
import {AuthGuard} from "@nestjs/passport";
import {Response} from "express";
import * as ServiceJson from "../../models/services/service.slack.json";

@Controller('slack')
export class SlackController {
    constructor(private readonly Slackservice: SlackService) {}

    @Get('/listId/:token')
    @UseGuards(AuthGuard())
    async get_all_conv(@Param('token') tok: string) {
        try {
            const value = await this.Slackservice.list_conversation(tok);
            return value;
        } catch (e) {
            throw new HttpException('Bad token', HttpStatus.BAD_REQUEST);
        }
    }

    @Post('/create/:name')
    @UseGuards(AuthGuard())
    async create_conv(@Param('name') name: string, @Body('token') tok: string) {
        try {
            const value = await this.Slackservice.create_channel(tok, name);
            return value;
        } catch (e) {
            throw new HttpException('Bad token', HttpStatus.BAD_REQUEST);
        }
    }

    @Get('/service')
    @UseGuards(AuthGuard())
    async getServiceSlack(@Res() res: Response) {
        try {
            res.status(HttpStatus.OK).json(ServiceJson);
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }
}