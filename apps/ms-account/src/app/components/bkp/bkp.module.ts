import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BkpEntity } from '../../entities/bkp.entity';
import { FileTypeEntity } from '../../entities/file-type.entity';
import { FileStructureEntity } from '../../entities/filestructure.entity';
import { FolderEntity } from '../../entities/folder.entity';
import { PhaseEntity } from '../../entities/phase.entity';
import { FolderService } from '../folder/service/folder.service';
import { ReferenceModule } from '../reference/reference.module';
import { BkpResolver } from './resolver/bkp.resolver';
import { BkpService } from './service/bkp.service';

@Module({
  imports: [TypeOrmModule.forFeature(
                [BkpEntity, 
                FolderEntity, 
                PhaseEntity, 
                FileTypeEntity, 
                FileStructureEntity]), ReferenceModule],
  providers: [BkpResolver, BkpService, FolderService],
  exports: [BkpResolver, BkpService]
})
export class BkpModule { }
