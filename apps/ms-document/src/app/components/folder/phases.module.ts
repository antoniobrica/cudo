
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Folder } from '../../entities/folder.entity';
import { FolderService } from './service/folder.service';
import { FolderResolver } from './resolver/folder.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Folder])],
  providers: [FolderService, FolderResolver],
  exports: [FolderService]
})
export class FolderModule {}
