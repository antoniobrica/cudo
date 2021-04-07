import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectFileEntity } from '../../entities/projectfile.entity';
import { ReferenceModule } from '../reference/reference.module';
import { ProjectFileResolver } from './resolver/projectFile.resolver';
import { ProjectFileService } from './service/proejctfile.service';



@Module({
  imports: [TypeOrmModule.forFeature([ProjectFileEntity]), ReferenceModule],
  providers: [ProjectFileResolver, ProjectFileService],
  exports: [ProjectFileResolver, ProjectFileService]
})
export class ProjectFileModule { }
