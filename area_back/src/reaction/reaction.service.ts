import { Injectable } from '@nestjs/common';
import { Reaction } from '../models/actReact/reaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReactionService {
    constructor(@InjectRepository(Reaction) public readonly reactionRepository: Repository<Reaction>) {}

    async getAllReactions(): Promise<Reaction[]> {
        const data = await this.reactionRepository.find();
        if (!data) {
            throw new Error("no Reactions to show");
        }
        return data;
    }

    async getReactionById(id: number): Promise<Reaction> {
        const data = await this.reactionRepository.findOne(id);
        if (!data) {
            throw new Error("no reaction with this ID");
        }
        return data;
    }

    async deleteReactById(reactId: number) {
        const data = await this.reactionRepository.findOne(reactId);
        if (!data) {
            throw new Error("no Reaction with this ID");
        }
        const deletedEntity = await this.reactionRepository.delete(reactId);
        return deletedEntity;
    }
}
