import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkTypeEntity } from '../../entities/workType.entity';
import { ReferenceModule } from '../reference/reference.module';
import { WorkTypesResolver } from './resolver/workTypes.resolver';
import { WorkTypesService } from './service/workTypes.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkTypeEntity]), ReferenceModule],
  providers: [WorkTypesResolver, WorkTypesService],
  exports: [WorkTypesService,WorkTypesResolver]
})
export class WorkTypesModule { }
