import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkTypeEntity } from '../../entities/work-type.entity';
import { ReferenceModule } from '../reference/reference.module';
import { WorkTypesResolver } from './resolver/workTypes.resolver';
import { WorkTypesService } from './service/workTypes.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkTypeEntity]), ReferenceModule],
  providers: [WorkTypesResolver, WorkTypesService],
})
export class WorkTypesModule { }
