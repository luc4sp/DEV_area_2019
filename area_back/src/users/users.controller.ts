import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { UserDto } from '../models/user/users.dto';
import { User } from '../models/user/users.entity';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ActionDto } from '../models/actReact/action.dto';
import { Action } from '../models/actReact/action.entity';


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAll(): Promise<User[]> {
    const users = await this.usersService.findAll();
    if (users) {
      return users;
    }
    throw new HttpException('No users to show', HttpStatus.ACCEPTED);
  }

  @Get(':userId')
  @UseGuards(AuthGuard())
  async getOne(@Param('userId') userId: number): Promise<User> {
    const userById = await this.usersService.findOneById(userId);
    if (userById) {
      return userById;
    }
    throw new HttpException('This user does not exist', HttpStatus.NOT_FOUND);
  }

  @Delete('delete')
  @UseGuards(AuthGuard())
  async userDelete(@Body('id') id: number): Promise<User> {
    const isExisting = await this.usersService.findOneById(id);
    if (isExisting) {
      const userToDelete = await this.usersService.deleteUser(id);
      return userToDelete;
    } else {
    throw new HttpException('This user does not exist', HttpStatus.NOT_FOUND);
    }
  }

  @Put(':userId')
  @UseGuards(AuthGuard())
  async updateOne(
    @Param('userId') userId: number,
    @Body() usersDto: UserDto,
  ): Promise<User> {
    if (usersDto.firstName || usersDto.lastName) {
      try {
        const userUpdate = await this.usersService.updateOne(userId, usersDto);
        if (userUpdate) {
          return userUpdate;
        }
      } catch (err) {
        throw new HttpException(err && err.message, HttpStatus.NOT_ACCEPTABLE);
      }
    }
    throw new HttpException('Not updated', HttpStatus.NOT_ACCEPTABLE);
  }
}
