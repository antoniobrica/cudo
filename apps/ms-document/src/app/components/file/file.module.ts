
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FileResolver } from './resolver/file.resolver';
import { FileService } from './service/file.service';
import { FileEntity } from '../../entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [FileService, FileResolver],
  exports: [FileService]
})
export class FileModule {}
