import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import BKPCostFilesEntity from '../../entities/bkp-cost-files.entity';
import BKPCostEntity from '../../entities/bkp-costs.entity';
import { BkpHierarchyEntity } from '../../entities/bkphierarchy.entity';
import { BkpLayerOneEntity } from '../../entities/bkpLayerOne.entity';
import { BkpLayerTwoEntity } from '../../entities/bkpLayerTwo.entity';
import { CostEntity } from '../../entities/cost.entity';
import { ReferenceModule } from '../reference/reference.module';
import { CostResolver } from './resolver/cost.resolver';
import { CostService } from './service/cost.service';


@Module({
  imports: [TypeOrmModule.forFeature([
    CostEntity, BKPCostEntity, BKPCostFilesEntity, BkpHierarchyEntity, BkpLayerOneEntity, BkpLayerTwoEntity
  ]), ReferenceModule],
  providers: [CostResolver, CostService],
  exports: [CostResolver, CostService]
})
export class CostModule { }
