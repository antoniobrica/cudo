import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Structure } from '../../entities/structure.entity';
import { ReferenceModule } from '../reference/reference.module';
import { StructureResolver } from './resolver/structure.resolver';
import { StructureService } from './service/structure.service';


@Module({
  imports: [TypeOrmModule.forFeature([Structure]), ReferenceModule],
  providers: [StructureResolver, StructureService],
  exports: [StructureResolver, StructureService]
})
export class StructureModule { }
