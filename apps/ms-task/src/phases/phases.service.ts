import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePhaseInput } from "./create-phases.input";
import { Phases } from "./phases.entity";


@Injectable()
export class PhasesService {
    constructor(
        @InjectRepository(Phases)
        private phaseRepository: Repository< Phases >,
      ) {}
      

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