import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { WorkTypeEntity } from '../../../entities/work-type.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import WorkParams from '../../../utils/types/workParam';
import WorkParam from '../../../utils/types/workParam';
import { ReferenceService } from '../../reference/service/reference.service';
import { CreateWorkTypeInput } from '../dto/input/create-workType.input';
import WorkTypeNotFoundException from '../exceptions/workTypeNotFound.exception';

@Injectable()
export class WorkTypesService {
  constructor(
    @InjectRepository(WorkTypeEntity)
    private WorkTypeRepository: Repository<WorkTypeEntity>,
    private referenceService: ReferenceService
  ) {}

  public async createWorkType(
    createWorkTypeInput: CreateWorkTypeInput,
    referenceFilter: ReferenceFilterParams
  ): Promise<WorkTypeEntity> {
    try {
      const taskeDetails = new WorkTypeEntity({ ...createWorkTypeInput });
      const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
      const newWorkType = await this.WorkTypeRepository.create({
        ...taskeDetails,
        reference: { id: selectedReference.id },
      });
      await this.WorkTypeRepository.save(newWorkType);
      return newWorkType;
    } catch (error) {
      return error;
    }
  }

  public async updateWorkType(
    createWorkTypeInput: CreateWorkTypeInput,
    referenceFilter: ReferenceFilterParams
  ): Promise<WorkTypeEntity> {
    const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
    const workType = await this.WorkTypeRepository.findOne({
      where: { workTypeID: createWorkTypeInput.workTypeID, reference: { id: selectedReference.id } },
    });
    if (workType) {
      await this.WorkTypeRepository.update(workType.id, { ...createWorkTypeInput });
      const updatedPost = await this.WorkTypeRepository.findOne({ where: { id: workType.id } });
      return updatedPost;
    }
    throw new WorkTypeNotFoundException(workType.workTypeID);
  }

  public async findAllWorkType(refFilter: ReferenceFilterParams): Promise<WorkTypeEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(refFilter);
    return await this.WorkTypeRepository.find({
      where: {
        reference: {
          id: selectedReference.id,
        },
      },
    });
  }

  async getWorktypeByWorkTypeID(workFilter: WorkParams) {
    const worktype = await this.WorkTypeRepository.findOne({ where: { ...workFilter } });
    if (worktype) {
      return worktype;
    }
    throw new WorkTypeNotFoundException(worktype.workTypeID);
  }
}
