import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  Repository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Phases } from "../../../entities/phases.entity";
import { TaskErrorTypeEnum } from "../../../enums/task-error-type.enum";
import TaskCustomError from "../../../taskCustomError.execption";
import { CreatePhaseInput } from "../dto/input/create-phases.input";



@Injectable()
export class PhasesService {
    constructor(
        @InjectRepository(Phases)
        private phaseRepository: Repository< Phases >,
      ) {}
      

  //   public async create(createPhaseData: CreatePhaseData): Promise<Phases> {
  //     const phase:  Phases = {
  //         phaseId: uuidv4(),
  //         ...createPhaseData
  //     }
  //     return await this.phaseRepository.create(phase);
  // }


    async create(createPhaseData: CreatePhaseInput): Promise<Phases>{
        return await this.phaseRepository.save(createPhaseData);
    }

    async findAll(): Promise<Phases[]> {
        return await this.phaseRepository.find();
      }

    async findOne(id: number): Promise<Phases> {
        const phase = await this.phaseRepository.findOne(id);
        if(!phase){
          throw new TaskCustomError(TaskErrorTypeEnum.RECORD_NOT_EXIST)
        }
        return phase
      }

}