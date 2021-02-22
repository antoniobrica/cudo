import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ReferenceFilterParams from '../../utils/types/referenceFilterParams';
import { ReferenceService } from '../reference/service/reference.service';
import { CreateProjectWorkTypeInput } from './create-ProjectWorkType.input';
import { ProjectWorkTypeEntity } from './project-WorkType.entity';
import ProjectWorkTypeNotFoundException from './ProjectworkTypeNotFound.exception';


@Injectable()
export class ProjectWorkTypesService {
  constructor(
    @InjectRepository(ProjectWorkTypeEntity)
    private ProjectWorkTypeRepository: Repository<ProjectWorkTypeEntity>,
    private referenceService: ReferenceService,
  ) { }

  public async createProjectWorkType(createWorkTypeInput: CreateProjectWorkTypeInput, referenceFilter: ReferenceFilterParams): Promise<ProjectWorkTypeEntity> {
    try {
      const taskeDetails = new ProjectWorkTypeEntity({ ...createWorkTypeInput });
      const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
      const newPost = await this.ProjectWorkTypeRepository.create({
        ...taskeDetails,
        reference: { id: selectedReference.id }
      });
      await this.ProjectWorkTypeRepository.save(newPost);
      return newPost;
    } catch (error) {
      return error;
    }
  }

  public async updateWorkType(createProjectWorkTypeInput: CreateProjectWorkTypeInput, referenceFilter: ReferenceFilterParams): Promise<ProjectWorkTypeEntity> {

    const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
    const workType = await this.ProjectWorkTypeRepository.findOne({ where: { workTypeID: createProjectWorkTypeInput.projectWorkTypeID, reference: { id: selectedReference.id } } });
    if (workType) {
      await this.ProjectWorkTypeRepository.update(workType.id, { ...createProjectWorkTypeInput });
      const updatedPost = await this.ProjectWorkTypeRepository.findOne(workType.id);
      return updatedPost;
    }
    throw new ProjectWorkTypeNotFoundException(workType.projectWorkTypeID);
  }

  public async findAllWorkType(refFilter: ReferenceFilterParams): Promise<ProjectWorkTypeEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(refFilter)
    return await this.ProjectWorkTypeRepository.find({
      "reference": {
        id: selectedReference.id
      }
    });

  }

}