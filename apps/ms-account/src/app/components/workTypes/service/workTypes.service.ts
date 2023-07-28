import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { WorkTypeEntity } from '../../../entities/workType.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import WorkParams from '../../../utils/types/workParam';
import { ReferenceService } from '../../reference/service/reference.service';
import { CreateWorkTypeInput } from '../dto/input/create-workType.input';
import { UpdateWorkType } from '../dto/input/update-workType';
import WorkTypeNotFoundException from '../exceptions/workTypeNotFound.exception';

@Injectable()
export class WorkTypesService {
  constructor(
    @InjectRepository(WorkTypeEntity)
    private WorkTypeRepository: Repository<WorkTypeEntity>,
    private referenceService: ReferenceService,
  ) { }

  public async createWorkType(createWorkTypeInput: CreateWorkTypeInput, referenceFilter: ReferenceFilterParams): Promise<WorkTypeEntity> {
    try {
      const taskeDetails = new WorkTypeEntity({ ...createWorkTypeInput });
      const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
      const newWorkType = await this.WorkTypeRepository.create({
        ...taskeDetails,
        reference: { id: selectedReference.id }
      });
      await this.WorkTypeRepository.save(newWorkType);
      return newWorkType;
    } catch (error) {
      return error;
    }
  }

  public async updateWorkType(updateWorkType: UpdateWorkType,createWorkTypeInput: CreateWorkTypeInput): Promise<WorkTypeEntity> {
    const workType = await this.WorkTypeRepository.findOne({ where: { workTypeID: updateWorkType.workTypeID } });
    if (workType) {
      await this.WorkTypeRepository.update(workType.Id, { ...createWorkTypeInput });
      const updatedPost = await this.WorkTypeRepository.findOne(workType.Id);
      return updatedPost;
    }
    throw new WorkTypeNotFoundException(workType.workTypeID);
  }

  public async findAllWorkType(refFilter: ReferenceFilterParams): Promise<WorkTypeEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(refFilter)
    return await this.WorkTypeRepository.find({
      "reference": {
        id: selectedReference.id
      }
    });

  }

  async getWorktypeByWorkTypeID(workFilter: WorkParams) {
    const worktype = await this.WorkTypeRepository.findOne({ where: { ...workFilter} });
    if (worktype) {
        return worktype;
    }
    throw new WorkTypeNotFoundException(worktype.workTypeID);
  }

  public async deleteWorkTypeByID(DeleteInput: UpdateWorkType): Promise<WorkTypeEntity[]> {
    const { workTypeID } = DeleteInput;
    const workTypeDetails = await this.WorkTypeRepository.delete({ workTypeID: workTypeID });
    const worktype = await this.WorkTypeRepository.find({
        where: { workTypeID: workTypeID },
    });
    return worktype;
}


}