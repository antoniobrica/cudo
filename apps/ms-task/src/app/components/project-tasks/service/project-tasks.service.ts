import { Inject, Injectable } from '@nestjs/common';
import { ProjectTasksEntity } from '../../../entities/project-tasks.entity';
import { CreateProjectTaskInput } from '../dto/input/create-project-task.input';
import { IProjectTasksRepository } from '../interface/project-tasks-repository.interface';
import { IProjectTasksService } from '../interface/project-tasks-service.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProjectTasksService implements IProjectTasksService {
    constructor(
        @Inject('IProjectTasksRepository')
        private readonly projectTasksRepository: IProjectTasksRepository
    ) { }

    public async create(createProjectTaskInput: CreateProjectTaskInput): Promise<ProjectTasksEntity> {
        const projectTasksEntity: ProjectTasksEntity = {
            TaskID: uuidv4(),
            ...createProjectTaskInput
        }
        return await this.projectTasksRepository.create(projectTasksEntity);
    }


    public async findAll(): Promise<ProjectTasksEntity[]> {

        return await this.projectTasksRepository.findAll();
    }

}
