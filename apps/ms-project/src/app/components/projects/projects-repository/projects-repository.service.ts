import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from '../../../repositories/base/base-abstract-repository';
import { ProjectEntity } from '../entity/project.entity';
import { ProjectRepositoryInterface } from '../interface/project.repository.interface';

@Injectable()
export class ProjectsRepositoryService 
extends BaseAbstractRepository<ProjectEntity>
implements ProjectRepositoryInterface {
constructor(
  @InjectRepository(ProjectEntity)
  private readonly projectRepository: Repository<ProjectEntity>
) {
  super(projectRepository);
}
}
