import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { PhaseEntity } from '../../../entities/phase.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { CreatePhaseInput } from '../dto/args/create-phase.input';
import PhaseNotFoundException from '../exceptions/phaseNotFound.exception';




@Injectable()
export class PhaseService {
  constructor(
    @InjectRepository(PhaseEntity)
    private PhaseRepository: Repository<PhaseEntity>,
    private referenceService: ReferenceService,
  ) { }

  public async createPhase(createphaseInput: CreatePhaseInput, referenceFilter: ReferenceFilterParams): Promise<PhaseEntity> {
    try {
      const taskeDetails = new PhaseEntity({ ...createphaseInput });
      const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
      const newPost = await this.PhaseRepository.create({
        ...taskeDetails,
        reference: { id: selectedReference.id }
      });
      await this.PhaseRepository.save(newPost);
      return newPost;
    } catch (error) {
      return error;
    }
  }


  public async findAllPhase(refFilter: ReferenceFilterParams): Promise<PhaseEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(refFilter)
    return await this.PhaseRepository.find({
      "reference": {
        id: selectedReference.id
      }
    });

  }

}