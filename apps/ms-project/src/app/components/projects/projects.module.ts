import { Module } from '@nestjs/common';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';
import { ProjectsRepositoryService } from './projects-repository/projects-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from '../../entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  providers: [ProjectsResolver, {
    provide: 'ProjectRepositoryInterface',
    useClass: ProjectsRepositoryService,
  },
    {
      provide: 'ProjectServiceInterface',
      useClass: ProjectsService,
    }],
})
export class ProjectsModule { }
