import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileVersionEntity } from '../../entities/fileversion.entity';
import { FileVersionResolver } from './resolver/fileversion.resolver';
import { FileVersionService } from './service/fileversion.service';


@Module({
  imports: [TypeOrmModule.forFeature([FileVersionEntity])],
  providers: [FileVersionResolver, FileVersionService],
  exports: [FileVersionResolver, FileVersionService]
})
export class FileVersionModule { }
