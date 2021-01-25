import { Injectable } from '@nestjs/common';
import { Tender } from '../app/interfaces/tender.interface';

@Injectable()
export class TenderService {
  
    async findAll(): Promise<Tender[]> {
      return new Promise<Tender[]>((resolve) => {
        resolve(  [{
          "id": "dfgdfhfghfg",
          "name": "tender",
          "description": "strighdffjng",
          "qty": 567
          }]);
    });
    }
  }
