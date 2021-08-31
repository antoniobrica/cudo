import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    console.log(' ms tender app')
    return { message: 'Welcome to ms-tender!' };
  }
}
