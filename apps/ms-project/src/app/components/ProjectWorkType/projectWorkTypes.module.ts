import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectWorkTypeEntity } from '../../entities/project-WorkType.entity';
import { ReferenceModule } from '../reference/reference.module';
import { ProjectWorkTypesResolver } from './resolver/projectWorkTypes.resolver';
import { ProjectWorkTypesService } from './service/ProjectWorkType.service';



@Module({
  imports: [TypeOrmModule.forFeature([ProjectWorkTypeEntity]), ReferenceModule],
  providers: [ProjectWorkTypesResolver, ProjectWorkTypesService],
})
export class ProjectWorkTypesModule { }
