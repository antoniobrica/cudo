import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectWorkTypeEntity } from '../../entities/project-WorkType.entity';
import { ProjectEntity } from '../../entities/project.entity';
import { WorkTypeEntity } from '../../entities/work-type.entity';
import { ReferenceModule } from '../reference/reference.module';
import { WorkTypesModule } from '../workTypes/workTypes.module';
import { ProjectResolver } from './resolver/project.resolver';
import { ProjectService } from './service/project.service';


@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, ProjectWorkTypeEntity, WorkTypeEntity]), ReferenceModule, WorkTypesModule],
  providers: [ProjectResolver, ProjectService],
})
export class ProjectsModule { }

