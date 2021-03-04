import { Module } from '@nestjs/common';
import { ReferenceResolver } from './resolver/reference.resolver';
import { ReferenceService } from './service/reference.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ReferanceTypeEntity from '../../entities/references.entity';
import { BkpModule } from '../bkp/bkp.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReferanceTypeEntity])],
  providers: [ReferenceResolver, ReferenceService],
  exports: [ReferenceService, ReferenceResolver]
})
export class ReferenceModule { }
