import { Controller, Post, Body, HttpException, HttpStatus, Get, Param, UseGuards, Delete, Put } from '@nestjs/common';
import { ActionDto } from '../models/actReact/action.dto';
import { Action } from '../models/actReact/action.entity';
import { ActionService } from './action.service';
import { AuthGuard } from '@nestjs/passport';
import { Reaction } from 'src/models/actReact/reaction.entity';

@Controller('action')
export class ActionController {
    constructor(private actionService: ActionService) {}

    @Get()
    @UseGuards(AuthGuard())
    async GetActions(): Promise<Action[]> {
        try {
            return await this.actionService.getActions();
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }
    
    @Get('actionId/:id')
    @UseGuards(AuthGuard())
    async getActionById(@Param('id') id: number): Promise<Action> {
        try {
            return await this.actionService.getActionById(id);
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('actUser/:userId')
    @UseGuards(AuthGuard())
    async getAllFromUser(@Param('userId') userId: number): Promise<Action[]> {
        try {
            const actions = await this.actionService.getActionsFromUser(userId);
            return actions;
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('pushActions')
    @UseGuards(AuthGuard())
    async PushActions(@Body() actions: ActionDto): Promise<Action> {
        try {
            const action = await this.actionService.postActions(actions);
            return action;
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('react/:userId')
    @UseGuards(AuthGuard())
    async getAllReactionsFromUser(@Param('userId') userId: number): Promise<Reaction[]> {
        try {
            return await this.actionService.getAllReactionsFromUser(userId);
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('react')
    @UseGuards(AuthGuard())
    async getAllReactions(): Promise<Reaction[]> {
        try {
            return await this.actionService.getAllReactions();
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put('react/update/:actionId')
    @UseGuards(AuthGuard())
    async UpdateOneByActionId(@Param('actionId') actionId: number, @Body() action: ActionDto) {
        try {
            return await this.actionService.updateOneByActionId(actionId, action);
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('delete/:actionId')
    @UseGuards(AuthGuard())
    async deleteActionById(@Param('actionId') actionId: number) {
        try {
            return await this.actionService.deleteActById(actionId);
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('doaction/:userId')
    @UseGuards(AuthGuard())
    async Action_Checker(): Promise<any> {
        try {
            let i = 0;
            const all_action = await this.actionService.getAllReactions();
            while (all_action[i]) {
                /*Check si l'action est bonne*/
                await this.actionService.check_action(all_action[i]);
                i++;
            }
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('launch')
    @UseGuards(AuthGuard())
    async launch() {
        setInterval(async() => await this.Action_Checker(), 30000);
    }
}
