import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskRepositoryInterface } from 'apps/ms-task/src/app/component/task/interface/task.repository.interface';
import { BaseAbstractRepository } from '../base-abstract-repository';
import { TaskEntity } from '../../../component/task/entity/task.entity';

@Injectable()
export class TaskRepositoryService
  extends BaseAbstractRepository<TaskEntity>
  implements TaskRepositoryInterface {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>
  ) {
    super(tasksRepository);
  }
}
