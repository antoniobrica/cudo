import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from '../../entities/file.entity';
import { ReferenceModule } from '../reference/reference.module';
import { FileResolver } from './resolver/file.resolver';
import { FileService } from './service/file.service';


@Module({
  imports: [TypeOrmModule.forFeature([FileEntity]), ReferenceModule],
  providers: [FileResolver, FileService],
  exports: [FileResolver, FileService]
})
export class FileModule { }
