import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import BKPCostFilesEntity from '../../entities/bkp-cost-files.entity';
import BKPCostEntity from '../../entities/bkp-costs.entity';
import { CostEntity } from '../../entities/cost.entity';
import { ReferenceModule } from '../reference/reference.module';
import { CostResolver } from './resolver/cost.resolver';
import { CostService } from './service/cost.service';


@Module({
  imports: [TypeOrmModule.forFeature([CostEntity, BKPCostEntity, BKPCostFilesEntity]), ReferenceModule],
  providers: [CostResolver, CostService],
  exports: [CostResolver, CostService]
})
export class CostModule { }
