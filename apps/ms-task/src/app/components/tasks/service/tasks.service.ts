import { Inject, Injectable } from '@nestjs/common';
import { TasksEntity } from '../../../entities/tasks.entity';
import { TaskDetailsInput } from '../dto/input/task-details.input';
import { ITasksRepository } from '../interface/tasks-repository.interface';
import { IProjectTasksService } from '../interface/tasks-service.interface';
import { v4 as uuidv4 } from 'uuid';
import { TasksModel } from '../models/tasks.model';

@Injectable()
export class TasksService implements IProjectTasksService {
    constructor(
        @Inject('ITasksRepository')
        private readonly projectTasksRepository: ITasksRepository
    ) { }
    create(createProjectTaskInput: TaskDetailsInput): Promise<TasksEntity> {
        const taskeDetails = new TasksEntity(createProjectTaskInput);

        return this.projectTasksRepository.create(taskeDetails);
    }

    public async findAll(): Promise<TasksEntity[]> {

        return await this.projectTasksRepository.findAll();
    }

}
