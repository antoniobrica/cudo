import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileStructureEntity } from '../../entities/filestructure.entity';
import { ReferenceModule } from '../reference/reference.module';
import { FileStructureResolver } from './resolver/fileStructure.resolver';
import { FileStructureService } from './service/fileStructure.service';


@Module({
  imports: [TypeOrmModule.forFeature([FileStructureEntity]), ReferenceModule],
  providers: [FileStructureResolver, FileStructureService],
  exports: [FileStructureResolver, FileStructureService]
})
export class FileStructureModule { }
