import { Module } from '@nestjs/common';
import { TasksService } from './service/tasks.service';
import { TasksResolver } from './resolver/tasks.resolver';
import { TasksRepositoryService } from './repository/tasks-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from '../../entities/tasks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity])],
  providers: [TasksResolver,
    {
      provide: 'ITasksRepository',
      useClass: TasksRepositoryService,
    },
    {
      provide: 'IProjectTasksService',
      useClass: TasksService,
    }]
})
export class TasksModule { }
