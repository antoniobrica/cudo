import { Injectable } from '@nestjs/common';
import { SecretService } from 'libs/ms-core/src/services/secret/secret.service';

@Injectable()
export class AppService {
  constructor(private secretService: SecretService){
    secretService = new SecretService
  }
  getData(): { message: string } {
    const value = this.secretService.getSecretValue("cusdo-secret");
    console.log(value)
    return { message: 'Welcome to ms-document!' };
  }
}
