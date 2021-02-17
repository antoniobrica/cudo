import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ProjectEntity } from '../../entities/project.entity';
import { CreateProjectInput } from './dto/input/create-project.input';
import { ProjectRepositoryInterface } from './interface/project.repository.interface';
import { ProjectServiceInterface } from './interface/project.service.interface';
import { Project } from './models/project';

@Injectable()
export class ProjectsService implements ProjectServiceInterface {
  constructor(
    @Inject('ProjectRepositoryInterface')
    private readonly projectRepository: ProjectRepositoryInterface
  ) { }

  public async create(createProjectInput: CreateProjectInput): Promise<ProjectEntity> {
    try{
    const projectEntity: ProjectEntity={
        projectId: uuidv4(),
        // createdAt: new Date,
        // updatedAt: new Date,
      ...createProjectInput}
      return await this.projectRepository.create(projectEntity);
    }catch(error){throw 'Invalid Input'; }
} 

  public  async findAll(): Promise<ProjectEntity[]> {
    
    return await this.projectRepository.findAll();
  }

}