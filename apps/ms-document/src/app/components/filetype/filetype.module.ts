import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileTypeEntity } from '../../entities/file-type.entity';
import { ReferenceModule } from '../reference/reference.module';
import { FileTypeResolver } from './resolver/filetype.resolver';
import { FileTypeService } from './service/filetype.service';


@Module({
  imports: [TypeOrmModule.forFeature([FileTypeEntity]), ReferenceModule],
  providers: [FileTypeResolver, FileTypeService],
  exports: [FileTypeResolver, FileTypeService]

})
export class FileTypeModule { }
