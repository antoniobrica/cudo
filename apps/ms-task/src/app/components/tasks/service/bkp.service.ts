import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { BKP } from '../../../entities/bkp.entity';
import { CreateBkpInput } from '../dto/input/create-bkp.input';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BkpService {
  constructor(
    @InjectRepository(BKP)
    private bkpRepository: Repository<BKP>
  ) {}

  //   public async create(createBkpData: CreateBkpInput): Promise<BKP> {
  //     const bkp:  BKP = {
  //         bkpId: uuidv4(),
  //         ...createBkpData
  //     }
  //     return await this.bkpRepository.create(bkp);
  // }

  create(createBkpData: CreateBkpInput): Promise<BKP> {
    return this.bkpRepository.save(createBkpData);
  }

  findAll(): Promise<BKP[]> {
    return this.bkpRepository.find();
  }

  findOne(id: number): Promise<BKP> {
    const options: FindOneOptions<BKP> = {
      where: {
        Id: id,
      },
    };
    return this.bkpRepository.findOne(options);
  }
}
