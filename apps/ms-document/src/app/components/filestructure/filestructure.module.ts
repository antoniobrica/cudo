import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FileStructureEntity } from '../../entities/filestructure.entity';
import { FileStructureResolver } from './resolver/filestructure.resolver';
import { FileStructureService } from './service/filestructure.service';



@Module({
  imports: [TypeOrmModule.forFeature([FileStructureEntity])],
  providers: [FileStructureService, FileStructureResolver],
  exports: [FileStructureService]
})
export class FileStructureModule {}
