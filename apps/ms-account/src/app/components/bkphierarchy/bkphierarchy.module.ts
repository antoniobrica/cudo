import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import BKPCostFilesEntity from '../../entities/bkp-cost-files.entity';
import BKPCostEntity from '../../entities/bkp-costs.entity';
import { BkpHierarchyEntity } from '../../entities/bkphierarchy.entity';
import { ReferenceModule } from '../reference/reference.module';
import { BkpHierarchyResolver } from './resolver/bkphierarchy.resolver';
import { BkpHierarchyService } from './service/bkphierarchy.service';


@Module({
  imports: [TypeOrmModule.forFeature([BkpHierarchyEntity, BKPCostEntity, BKPCostFilesEntity]), ReferenceModule],
  providers: [BkpHierarchyResolver, BkpHierarchyService],
  exports: [BkpHierarchyResolver, BkpHierarchyService]
})
export class BkpHierarchyModule { }
