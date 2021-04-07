import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BKP } from '../../entities/bkp.entity';
import { FileEntity } from '../../entities/file.entity';
import { FileParamEntity } from '../../entities/file.param.entity';
import { FileStructureEntity } from '../../entities/filestructure.entity';
import { Folder } from '../../entities/folder.entity';
import { Phases } from '../../entities/phases.entity';
import { ReferenceModule } from '../reference/reference.module';
import { FileResolver } from './resolver/file.resolver';
import { FileService } from './service/file.service';


@Module({
  imports: [TypeOrmModule.forFeature([FileEntity, FileParamEntity, BKP,Phases,Folder, FileStructureEntity]), ReferenceModule],
  providers: [FileResolver, FileService],
  exports: [FileResolver, FileService]
})
export class FileModule { }
