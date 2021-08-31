import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    console.log(' ms protocol app')
    return { message: 'Welcome to ms-protocol!' };
  }
}
