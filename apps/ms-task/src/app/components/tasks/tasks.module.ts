import { Module } from '@nestjs/common';
import { TasksService } from './service/tasks.service';
import { TasksResolver } from './resolver/tasks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from '../../entities/tasks.entity';
import { ReferenceModule } from '../reference/reference.module';
import { BkpModule } from './module/bkp.module';
import { PhasesModule } from './module/phases.module';

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity]), ReferenceModule, BkpModule, PhasesModule],
  providers: [TasksResolver, TasksService],
  exports: [TasksService]
})
export class TasksModule { }
