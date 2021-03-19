
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FileEntity } from '../../entities/file.entity';
import { FileResolver } from './resolver/file.resolver';
import { FileService } from './service/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [FileService, FileResolver],
  exports: [FileService]
})
export class FileModule {}
