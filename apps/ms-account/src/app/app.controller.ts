import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    console.log()
  }

  @Get("health-check")
  getData() {
    return this.appService.getData();
  }
}
