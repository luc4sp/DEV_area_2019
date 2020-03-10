import { Controller, Get, HttpStatus, HttpException, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import * as AboutJson from './models/json/about.json';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('about.json')
  getAboutJson(@Res() res: Response) {
    try {
        res.status(HttpStatus.OK).json(AboutJson);
    } catch (err) {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
