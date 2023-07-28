import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { FileTypeEntity } from '../../../entities/file-type.entity';
import { FileStructureEntity } from '../../../entities/filestructure.entity';
import { PhaseEntity } from '../../../entities/phase.entity';
import { WorkTypeEntity } from '../../../entities/workType.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';


@Injectable()
export class AllService {
  constructor(
    public referenceService: ReferenceService,
    @InjectRepository(PhaseEntity)
    private PhaseRepository: Repository<PhaseEntity>,
    @InjectRepository(FileStructureEntity)
    private fileStructureRepository: Repository<FileStructureEntity>,
    @InjectRepository(FileTypeEntity)
    private FileTypeRepository: Repository<FileTypeEntity>,
    @InjectRepository(WorkTypeEntity)
    private WorkTypeRepository: Repository<WorkTypeEntity>,
  ) { }


  public async findAll(refFilter: ReferenceFilterParams){
    const selectedReference = await this.referenceService.getReferenceById(refFilter)
   
    const phases =  await this.PhaseRepository.find({
      "reference": {
        id: selectedReference.id
      }
    });

    const structures = await this.fileStructureRepository.find({
      "reference": {
        id: selectedReference.id
      }
    });

    const filetypes =  await this.FileTypeRepository.find({
      "reference": {
        id: selectedReference.id
      }
    });

    const worktypes =  await this.WorkTypeRepository.find({
      "reference": {
        id: selectedReference.id
      }
    });

    return {
      phases: phases,
      filestructures: structures,
      filetypes: filetypes,
      worktypes: worktypes
    };

  }
}