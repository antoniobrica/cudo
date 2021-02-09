import { Module } from '@nestjs/common';
import { TasksResolver } from './task.resolver';
import { TasksService } from './task.service';
import { TaskRepositoryService } from 'apps/ms-task/src/app/repositories/base/task/task-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]),],// TypeOrmModule.forFeature([userEntity])
  providers: [TasksResolver, {
    provide: 'TaskRepositoryInterface',
    useClass: TaskRepositoryService,
  },
  {
    provide: 'TaskServiceInterface',
    useClass: TasksService,
  }],
})
export class TaskModule {}
