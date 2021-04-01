
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProjectFileService } from './service/projectfile.service';
import { ProjectFileResolver } from './resolver/porjectfile.resolver';
import { ProjectFileEntity } from '../../entities/projectfile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectFileEntity])],
  providers: [ProjectFileService, ProjectFileResolver],
  exports: [ProjectFileService]
})
export class ProjectFileModule {}
