import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  Repository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Phases } from "../../../entities/phases.entity";
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


    create(createPhaseData: CreatePhaseInput): Promise<Phases>{
        return this.phaseRepository.save(createPhaseData);
    }

    findAll(): Promise<Phases[]> {
        return this.phaseRepository.find();
      }

    findOne(id: number): Promise<Phases> {
        return this.phaseRepository.findOne(id);
      }

}