import { Inject, Injectable } from '@nestjs/common';
import { ProjectTasksEntity } from '../../../entities/project-tasks.entity';
import { CreateProjectTaskInput } from '../dto/input/create-project-task.input';
import { IProjectTasksRepository } from '../interface/project-tasks-repository.interface';
import { IProjectTasksService } from '../interface/project-tasks-service.interface';
import { v4 as uuidv4 } from 'uuid';
import { ProjectTasksModel } from '../models/project-tasks.model';

@Injectable()
export class ProjectTasksService implements IProjectTasksService {
    constructor(
        @Inject('IProjectTasksRepository')
        private readonly projectTasksRepository: IProjectTasksRepository
    ) { }
    create(createProjectTaskInput: CreateProjectTaskInput): Promise<ProjectTasksEntity> {
        const taskeDetails = new ProjectTasksEntity(createProjectTaskInput);

        return this.projectTasksRepository.create(taskeDetails);
    }

    public async findAll(): Promise<ProjectTasksEntity[]> {

        return await this.projectTasksRepository.findAll();
    }

}
