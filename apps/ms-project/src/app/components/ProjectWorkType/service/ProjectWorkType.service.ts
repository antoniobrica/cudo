import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectWorkTypeEntity } from '../../../entities/project-WorkType.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { CreateProjectWorkTypeInput } from '../dto/create-ProjectWorkType.input';



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