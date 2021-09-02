import { Injectable } from '@nestjs/common';
import { SecretService } from '@cudo/ms-core'

@Injectable()
export class AppService {
  constructor(private secretService: SecretService) {
    secretService = new SecretService
  }
  getData(): { message: string } {
    console.log(' 1 ms account app')
    const value = this.secretService.getSecretValue("cusdo-secret");
    return { message: 'Welcome to ms-account!' };
  }
}
