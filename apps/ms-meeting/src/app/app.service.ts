import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    console.log(' ms meeting app')
    return { message: 'Welcome to ms-meeting!' };
  }
}
