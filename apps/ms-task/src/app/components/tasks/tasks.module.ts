import { Module } from '@nestjs/common';
import { TasksService } from './service/tasks.service';
import { TasksResolver } from './resolver/tasks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from '../../entities/tasks.entity';
import { ReferenceModule } from '../reference/reference.module';

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity]), ReferenceModule],
  providers: [TasksResolver, TasksService]
})
export class TasksModule { }
