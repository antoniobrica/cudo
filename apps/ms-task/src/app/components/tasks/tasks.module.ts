import { Module } from '@nestjs/common';
import { TasksService } from './service/tasks.service';
import { TasksResolver } from './resolver/tasks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from '../../entities/tasks.entity';
import { ReferenceModule } from '../reference/reference.module';
import { BkpModule } from './module/bkp.module';
import { PhasesModule } from './module/phases.module';
import TaskAssigneessEntity from '../../entities/task-assignees.entity';
import TaskFllowersEntity from '../../entities/task-followers.entity';
import TaskFileEntity from '../../entities/task-file.entity';
import { SubTaskEntity } from '../../entities/subtask.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity, TaskAssigneessEntity, TaskFllowersEntity, TaskFileEntity, SubTaskEntity]), ReferenceModule, BkpModule, PhasesModule],
  providers: [TasksResolver, TasksService],
  // exports: [TasksService]
})
export class TasksModule { }
