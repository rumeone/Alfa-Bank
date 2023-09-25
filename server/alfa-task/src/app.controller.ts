import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller()
export class AppController {
  constructor() {}

  @Get('/getData')
  async getData(@Res() response: Response) {
    const filePath = path.join('./resources/testdata.json');

    try {
      const data = await fs.promises.readFile(filePath, 'utf-8');
      const jsonData = JSON.parse(data);
      response.json(jsonData);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Не удалось считать файл!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
