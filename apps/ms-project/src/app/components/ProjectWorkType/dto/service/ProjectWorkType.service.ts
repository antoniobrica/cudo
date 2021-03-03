import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectWorkTypeEntity } from 'apps/ms-project/src/app/entities/project-WorkType.entity';
import ReferenceFilterParams from 'apps/ms-project/src/app/utils/types/referenceFilterParams';
import { Repository } from 'typeorm';
import { ReferenceService } from '../../../reference/service/reference.service';
import { CreateProjectWorkTypeInput } from '../create-ProjectWorkType.input';



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
      const newPost = await this.ProjectWorkTypeRepository.create({
        ...taskeDetails,
      });
      await this.ProjectWorkTypeRepository.save(newPost);
      return newPost;
    } catch (error) {
      return error;
    }
  }
}