import { Module } from '@nestjs/common';
import ReferanceTypeEntity from '../../entities/references.entity';

import { ReferenceResolver } from './resolver/reference.resolver';
import { ReferenceService } from './service/reference.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ReferanceTypeEntity])],
  providers: [ReferenceResolver, ReferenceService],
  exports: [ReferenceService, ReferenceResolver],
})
export class ReferenceModule {}
