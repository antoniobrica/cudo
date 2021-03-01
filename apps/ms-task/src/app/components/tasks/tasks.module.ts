import { Module } from '@nestjs/common';
import { TasksService } from './service/tasks.service';
import { TasksResolver } from './resolver/tasks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from '../../entities/tasks.entity';
import { ReferenceModule } from '../reference/reference.module';
import TaskAssigneessEntity from '../../entities/task-assignees.entity';
import TaskFllowersEntity from '../../entities/task-followers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity, TaskAssigneessEntity, TaskFllowersEntity]), ReferenceModule],
  providers: [TasksResolver, TasksService]
})
export class TasksModule { }
