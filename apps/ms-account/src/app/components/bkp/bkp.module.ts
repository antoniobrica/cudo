import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BkpEntity } from '../../entities/bkp.entity';
import { FolderEntity } from '../../entities/folder.entity';
import { FolderService } from '../folder/service/folder.service';
import { ReferenceModule } from '../reference/reference.module';
import { BkpResolver } from './resolver/bkp.resolver';
import { BkpService } from './service/bkp.service';

@Module({
  imports: [TypeOrmModule.forFeature([BkpEntity, FolderEntity]), ReferenceModule],
  providers: [BkpResolver, BkpService, FolderService],
  exports: [BkpResolver, BkpService]
})
export class BkpModule { }
