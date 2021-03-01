import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ProjectEntity } from '../../../entities/project.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { CreateProjectInput } from '../dto/input/create-project.input';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
    private referenceService: ReferenceService,
  ) { }

  public async create(createProjectInput: CreateProjectInput, referenceFilter: ReferenceFilterParams): Promise<ProjectEntity> {
    try {
      const projectDetails = new ProjectEntity({ ...createProjectInput });
      const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
      const newProject = await this.projectRepository.create({
        ...projectDetails,
        reference: { id: selectedReference.id }
      });
      await this.projectRepository.save(newProject);
      return newProject;
    } catch (error) {
      return error;
    }
  }

  public async findAll(refFilter: ReferenceFilterParams): Promise<ProjectEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(refFilter)
    return await this.projectRepository.find({
      "reference": {
        id: selectedReference.id
      }
    });

  }

}