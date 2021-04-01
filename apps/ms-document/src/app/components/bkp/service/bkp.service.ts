import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BKP } from "../../../entities/bkp.entity";
import { CreateBkpInput } from "../dto/create-bkp.input";

@Injectable()
export class BkpService {
    constructor(
        @InjectRepository(BKP)
        private bkpRepository: Repository< BKP >,
      ) {}
      
      
  //   public async create(createBkpData: CreateBkpInput): Promise<BKP> {
  //     const bkp:  BKP = {
  //         bkpId: uuidv4(),
  //         ...createBkpData
  //     }
  //     return await this.bkpRepository.create(bkp);
  // }


    create(createBkpData: CreateBkpInput): Promise<BKP>{
        return this.bkpRepository.save(createBkpData);
    }

    findAll(): Promise<BKP[]> {
        return this.bkpRepository.find();
      }

    findOne(id: number): Promise<BKP> {
        return this.bkpRepository.findOne(id);
      }

}