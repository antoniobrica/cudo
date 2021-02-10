import { Repository } from 'typeorm';
import { BaseInterfaceRepository } from '../../../repositories/base/base-interface-repository.interface';
import { TaskEntity } from '../entity/task.entity';

export type TaskRepositoryInterface = BaseInterfaceRepository<TaskEntity>
