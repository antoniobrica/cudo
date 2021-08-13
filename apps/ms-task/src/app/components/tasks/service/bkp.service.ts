import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BKP } from "../../../entities/bkp.entity";
import { CreateBkpInput } from "../dto/input/create-bkp.input";
import { TaskErrorTypeEnum } from "../../../enums/task-error-type.enum";
import { Repository } from "typeorm";
import TaskCustomError from "../../../exceptions/taskCustomError.execption";



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


    async create(createBkpData: CreateBkpInput): Promise<BKP>{
        return await this.bkpRepository.save(createBkpData);
    }

    async findAll(): Promise<BKP[]> {
        return await this.bkpRepository.find();
      }

    async findOne(id: number): Promise<BKP> {
        const bkp = await this.bkpRepository.findOne(id);
        if(!bkp){
          throw new TaskCustomError(TaskErrorTypeEnum.RECORD_NOT_EXIST)
        }
        return bkp
      }

}