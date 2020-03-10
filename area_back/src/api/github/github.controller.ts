import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    UseGuards,
    Body,
    Res,
    Header,
    Param,
    Put,
    Delete
} from '@nestjs/common';
import {GithubService} from './github.service';
import {AuthGuard} from '@nestjs/passport';
import { Response } from 'express';
import * as ServiceJson from '../../models/services/service.github.json';

@Controller('github')
export class GithubController {
    constructor(private readonly Githubservice: GithubService) {}

    @Get('/:username/search')
    @UseGuards(AuthGuard())
    async Get_data_from_username(@Param('username') username: string) {
        try {
            const value = await this.Githubservice.GetdataFromUsername(username);
            return value;
        } catch (e) {
            throw new HttpException('No Username', HttpStatus.BAD_REQUEST);
        }
    }
    @Get('/:username/repos')
    @UseGuards(AuthGuard())
    async Get_repos_list_for_username(@Param('username') username: string) {
        try {
            const value = await this.Githubservice.GetRepositoryList(username);
            return value;
        } catch (e) {
            throw new HttpException('Bad username', HttpStatus.BAD_REQUEST);
        }
    }
    @Get('/:username/:repo_name/select')
    @UseGuards(AuthGuard())
    async Get_Sepcific_repository(@Param('username') username: string, @Param('repo_name') repository: string) {
        try {
            const value = await this.Githubservice.GetSpecificRepository(username, repository);
            return value;
        } catch (e) {
            throw new HttpException('Bad repository name or Username' , HttpStatus.BAD_REQUEST);
        }
    }
    @Get('/search/repos/:repo_name')
    @UseGuards(AuthGuard())
    async Search_repository(@Param('repo_name') repo_name: string) {
        try {
            const value = await this.Githubservice.SearchRepository(repo_name);
            console.log(repo_name);
            return value;
        } catch (e) {
            throw new HttpException('Error', HttpStatus.BAD_REQUEST);
        }
    }
    @Put('/stars/:username/:repo_name')
    @UseGuards(AuthGuard())
    async PutStarts(@Param('username') username: string, @Param('repo_name') repo: string, @Body('token') tok: string) {
        try {
            const value = await this.Githubservice.PutStars(username, repo, tok);
            return value;
        } catch (e) {
            throw new HttpException('Error', HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('/stars/:username/:repo_name')
    @UseGuards(AuthGuard())
    async DeleteStarts(@Param('username') username: string, @Param('repo_name') repo: string, @Body('token') tok: string) {
        try {
            const value = await this.Githubservice.deleteStars(username, repo, tok);
            return value;
        } catch (e) {
            throw new HttpException('Error', HttpStatus.BAD_REQUEST);
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