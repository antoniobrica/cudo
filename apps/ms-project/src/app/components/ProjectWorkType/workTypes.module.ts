import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferenceModule } from '../reference/reference.module';
import { ProjectWorkTypeEntity } from './project-WorkType.entity';
import { ProjectWorkTypesService } from './ProjectWorkType.service';
import { ProjectWorkTypesResolver } from './projectWorkTypes.resolver';


@Module({
  imports: [TypeOrmModule.forFeature([ProjectWorkTypeEntity]), ReferenceModule],
  providers: [ProjectWorkTypesResolver, ProjectWorkTypesService],
})
export class ProjectWorkTypesModule { }
