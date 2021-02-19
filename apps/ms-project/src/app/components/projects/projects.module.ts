import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from '../../entities/project.entity';
import { ReferenceModule } from '../reference/reference.module';
import { ProjectsResolver } from './resolver/projects.resolver';
import { ProjectsService } from './service/projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity]), ReferenceModule],
  providers: [ProjectsResolver, ProjectsService],
})
export class ProjectsModule { }
