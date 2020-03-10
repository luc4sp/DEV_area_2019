import {
    Body, Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    UseGuards,
    Res, Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {TrelloService} from './trello.service';
import {Cards, Trellokey} from '../../models/api/trello/trello.dto';
import * as ServiceJson from '../../models/services/service.trello.json';
import { Response } from 'express';

@Controller('trello')
export class TrelloController {
    constructor(private readonly trelloService: TrelloService) {}

    // Get all board
    @Get('/members/:username/:key/:oauth/boards')
    @UseGuards(AuthGuard())
    async get_board_for_account(@Param('username') username: string, @Param('key') tok: string, @Param('oauth') oauth: string): Promise<any> {
        try {
            const value = await this.trelloService.getAllBoards(username, tok, oauth);
            console.log(value)
            return value;
        } catch (err) {
            throw new HttpException('Bad Username', HttpStatus.NOT_ACCEPTABLE);
        }
    }
    @Get('/boards/:ID/:key/:oauth')
    @UseGuards(AuthGuard())
    async get_list_from_ID(@Param('ID') ID: string, @Param('key') tok: string, @Param('oauth') oauth: string) {
        try {
            const value = await this.trelloService.get_list_from_ID_board(ID, tok, oauth);
            return value;
        } catch (err) {
            throw new HttpException('Bad ID', HttpStatus.FORBIDDEN);
        }
    }

    @Get('idList/:ID/:key/:oauth')
    @UseGuards(AuthGuard())
    async get_cardList(@Param('ID') ID: string,  @Param('key') tok: string, @Param('oauth') oauth: string) {
        try {
            const value = await this.trelloService.get_nbr_of_cards_idList(ID, tok, oauth);
            return value;
        } catch (e) {
            throw new HttpException('Bad ID', HttpStatus.FORBIDDEN);
        }
    }

    @Post('/cards')
    @UseGuards(AuthGuard())
    async post_new_cards(@Body('name') cards: string, @Body('ID') idList: string , @Body('key') tok: string, @Body('oauth') oauth: string) {
        try {
            return await this.trelloService.Create_Cards(cards, idList, tok, oauth);
        } catch (err) {
            throw new HttpException('Cannot create Card', HttpStatus.FORBIDDEN);
        }
    }
    @Post('/boards')
    @UseGuards(AuthGuard())
    async post_new_boards(@Body('name') name: string, @Body('key') tok: string, @Body('oauth') oauth: string) {
        try {
            return await this.trelloService.Create_Boards(name, tok, oauth);
        } catch (err) {
            throw new HttpException('Cannot create Board', HttpStatus.FORBIDDEN);
        }
    }

    @Post('/list')
    @UseGuards(AuthGuard())
    async post_new_list(@Body('name') cards: string, @Body('ID') idList: string , @Body('key') tok: string, @Body('oauth') oauth: string) {
        try {
            return await this.trelloService.Create_list(cards, idList, tok, oauth);
        } catch (err) {
            throw new HttpException('Cannot create Card', HttpStatus.FORBIDDEN);
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
