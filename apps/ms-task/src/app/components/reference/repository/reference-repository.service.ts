import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ReferanceTypeEntity from '../../../entities/reference-type.entity';
import { BaseAbstractRepository } from '../../../repositories/base/base-abstract-repository';
import { IReferenceRepository } from '../interface/reference-repository.interface';

@Injectable()
export class ReferenceRepositoryService extends BaseAbstractRepository<ReferanceTypeEntity>
    implements IReferenceRepository {
    constructor(
        @InjectRepository(ReferanceTypeEntity)
        private readonly projectRepository: Repository<ReferanceTypeEntity>
    ) {
        super(projectRepository);
    }
}

