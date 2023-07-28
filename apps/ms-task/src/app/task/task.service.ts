import { Injectable } from '@nestjs/common';
import { Constants } from '@cudo/ms-core';
import { Itask } from '../interfaces/tender.interface';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TaskService {
  constructor(private httpService: HttpService) {}
  async findAll(): Promise<Itask[]> {
    return new Promise<Itask[]>((resolve) => {
      resolve([
        {
          id: 'dfgdfhfghfg',
          name: 'Task',
          description: 'strighdffjng',
          qty: 567,
        },
      ]);
    });
  }
  async find() {
    const response = await this.httpService
      .get(Constants.MS_TENDER_DAPR_URL)
      .toPromise();
    return response.data;
  }
}
