import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksEntity } from '../../../entities/tasks.entity';
import { BaseAbstractRepository } from '../../../repositories/base/base-abstract-repository';
import { ITasksRepository } from '../interface/tasks-repository.interface';

@Injectable()
export class TasksRepositoryService extends BaseAbstractRepository<TasksEntity>
    implements ITasksRepository {
    constructor(
        @InjectRepository(TasksEntity)
        private readonly projectRepository: Repository<TasksEntity>
    ) {
        super(projectRepository);
    }
}
