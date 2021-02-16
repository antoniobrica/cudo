import { Module } from '@nestjs/common';
import { ReferenceResolver } from './resolver/reference.resolver';
import { ReferenceService } from './service/reference.service';
import { ReferenceRepositoryService } from './repository/reference-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ReferanceTypeEntity from '../../entities/reference-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReferanceTypeEntity])],
  providers: [ReferenceResolver,
    {
      provide: 'IReferenceRepository',
      useClass: ReferenceRepositoryService,
    },
    {
      provide: 'IReferenceService',
      useClass: ReferenceService,
    }]
})
export class ReferenceModule { }
