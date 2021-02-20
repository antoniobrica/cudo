import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingTypeEntity } from '../../entities/building-type.entity';
import { ReferenceModule } from '../reference/reference.module';
import { BuildingTypesResolver } from './resolver/buildingTypes.resolver';
import { BuildingTypesService } from './service/buildingTypes.service';

@Module({
  imports: [TypeOrmModule.forFeature([BuildingTypeEntity]), ReferenceModule],
  providers: [BuildingTypesResolver, BuildingTypesService],
})
export class BuildingTypesModule { }
