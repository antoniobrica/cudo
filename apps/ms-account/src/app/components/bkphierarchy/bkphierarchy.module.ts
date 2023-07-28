import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BkpHierarchyEntity } from '../../entities/bkphierarchy.entity';
import { BkpLayerOneEntity } from '../../entities/bkpLayerOne.entity';
import { BkpLayerTwoEntity } from '../../entities/bkpLayerTwo.entity';
import { ReferenceModule } from '../reference/reference.module';
import { BkpHierarchyResolver } from './resolver/bkphierarchy.resolver';
import { BkpHierarchyService } from './service/bkphierarchy.service';


@Module({
  imports: [TypeOrmModule.forFeature([BkpHierarchyEntity, BkpLayerOneEntity, BkpLayerTwoEntity]), ReferenceModule],
  providers: [BkpHierarchyResolver, BkpHierarchyService],
  exports: [BkpHierarchyResolver, BkpHierarchyService]
})
export class BkpHierarchyModule { }
