import { Module } from '@nestjs/common';
import { ProjectTasksService } from './service/project-tasks.service';
import { ProjectTasksResolver } from './resolver/project-tasks.resolver';
import { ProjectTasksRepositoryService } from './repository/project-tasks-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectTasksEntity } from '../../entities/project-tasks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectTasksEntity])],
  providers: [ProjectTasksResolver,
    {
      provide: 'IProjectTasksRepository',
      useClass: ProjectTasksRepositoryService,
    },
    {
      provide: 'IProjectTasksService',
      useClass: ProjectTasksService,
    }]
})
export class ProjectTasksModule { }
