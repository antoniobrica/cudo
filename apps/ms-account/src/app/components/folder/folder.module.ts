import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FolderEntity } from '../../entities/folder.entity';
import { ReferenceModule } from '../reference/reference.module';
import { FolderResolver } from './resolver/folder.resolver';
import { FolderService } from './service/folder.service';


@Module({
  imports: [TypeOrmModule.forFeature([FolderEntity]), ReferenceModule],
  providers: [FolderResolver, FolderService],
  exports: [FolderResolver, FolderService]
})
export class FolderModule { }
