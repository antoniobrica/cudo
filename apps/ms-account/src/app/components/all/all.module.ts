import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileTypeEntity } from '../../entities/file-type.entity';
import { FileStructureEntity } from '../../entities/filestructure.entity';
import { PhaseEntity } from '../../entities/phase.entity';
import { WorkTypeEntity } from '../../entities/workType.entity';
import { ReferenceModule } from '../reference/reference.module';
import { AllResolver } from './resolver/all.resolver';
import { AllService } from './service/all.service';


@Module({
  imports: [TypeOrmModule.forFeature(
                [
                PhaseEntity, 
                FileTypeEntity, 
                FileStructureEntity,
                WorkTypeEntity]), ReferenceModule],
  providers: [AllResolver, AllService],
  exports: [AllResolver, AllService]
})
export class AllModule { }
