import { Controller, Get, HttpException, HttpStatus, Param, UseGuards, Delete } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { Reaction } from '../models/actReact/reaction.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('reaction')
export class ReactionController {
    constructor(private reactionService: ReactionService) {}

    @Get()
    @UseGuards(AuthGuard())
    async getAllReact(): Promise<Reaction[]> {
        try {
            return await this.reactionService.getAllReactions();
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('reactId/:id')
    @UseGuards(AuthGuard())
    async getReactById(@Param('id') id: number): Promise<Reaction> {
        try {
            return await this.reactionService.getReactionById(id);
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('delete/:reactId')
    async deleteReactionById(@Param('reactId') reactId: number) {
        try {
            return await this.reactionService.deleteReactById(reactId);
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }
}
