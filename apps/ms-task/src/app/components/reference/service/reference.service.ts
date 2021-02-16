import { Inject, Injectable } from '@nestjs/common';
import ReferanceTypeEntity from '../../../entities/reference-type.entity';
import { ReferenceInput } from '../dto/input/reference.input';
import { IReferenceRepository } from '../interface/reference-repository.interface';
import { IReferenceService } from '../interface/reference-service.interface';

@Injectable()
export class ReferenceService implements IReferenceService {
    constructor(
        @Inject('IReferenceRepository')
        private readonly projectTasksRepository: IReferenceRepository
    ) { }
    create(createProjectTaskInput: ReferenceInput): Promise<ReferanceTypeEntity> {

        const { referenceID, referenceType, tasks } = createProjectTaskInput;
        const taskeDetails = new ReferanceTypeEntity({ referenceID, referenceType });

        return this.projectTasksRepository.create(taskeDetails);
    }

    public async findAll(): Promise<ReferanceTypeEntity[]> {

        return await this.projectTasksRepository.findAll();
    }

}