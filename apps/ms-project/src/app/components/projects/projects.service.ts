import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { GetProjectArgs } from './dto/args/get-project.args';
import { GetProjectsArgs } from './dto/args/get-projects.args';
import { CreateProjectInput } from './dto/input/create-project.input';
import { DeleteProjectInput } from './dto/input/delete-project.input';
import { ProjectEntity } from './entity/project.entity';
import { ProjectRepositoryInterface } from './interface/project.repository.interface';
import { ProjectServiceInterface } from './interface/project.service.interface';
import { Project } from './models/project';

@Injectable()
export class ProjectsService implements ProjectServiceInterface {
  constructor(
    @Inject('ProjectRepositoryInterface')
    private readonly projectRepository: ProjectRepositoryInterface
  ) {}

  public async create(createProjectInput: CreateProjectInput): Promise<ProjectEntity> {
    const projectEntity: ProjectEntity={
        projectId: uuidv4(),
      ...createProjectInput}
      return await this.projectRepository.create(projectEntity);
}


  public  async findAll(): Promise<ProjectEntity[]> {
    
    return await this.projectRepository.findAll();
  }

}