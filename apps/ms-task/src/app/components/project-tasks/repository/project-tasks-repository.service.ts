import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectTasksEntity } from '../../../entities/project-tasks.entity';
import { BaseAbstractRepository } from '../../../repositories/base/base-abstract-repository';
import { IProjectTasksRepository } from '../interface/project-tasks-repository.interface';

@Injectable()
export class ProjectTasksRepositoryService extends BaseAbstractRepository<ProjectTasksEntity>
    implements IProjectTasksRepository {
    constructor(
        @InjectRepository(ProjectTasksEntity)
        private readonly projectRepository: Repository<ProjectTasksEntity>
    ) {
        super(projectRepository);
    }
}
