import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    console.log('welcome to ms-account app controller');
  }

  @Get()
  getData() {
    return this.appService.getData();
  }
}
