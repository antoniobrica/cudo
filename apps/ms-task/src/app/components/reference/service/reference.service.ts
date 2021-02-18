import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, MoreThan, Repository } from 'typeorm';
import ReferanceTypeEntity from '../../../entities/reference-type.entity';
import { GetReferenceArgs } from '../dto/args/get-reference.arg.dto';
import { ReferenceInputDto } from '../dto/input/reference.input.dto';
import ProjectNotFoundException from '../exceptions/projectNotFound.exception';

@Injectable()
export class ReferenceService {
    constructor(
        @InjectRepository(ReferanceTypeEntity)
        private referancesRepository: Repository<ReferanceTypeEntity>,
    ) { }

    async createReference(referenceDetails: ReferenceInputDto) {
        const newReferance = await this.referancesRepository.create(new ReferanceTypeEntity({
            ...referenceDetails
        }));
        await this.referancesRepository.save(newReferance);
        return newReferance;
    }

    async getReference(offset?: number, limit?: number, startId?: number, options?: FindManyOptions<ReferanceTypeEntity>) {
        const where: FindManyOptions<ReferanceTypeEntity>['where'] = {};
        let separateCount = 0;
        if (startId) {
            where.id = MoreThan(startId);
            separateCount = await this.referancesRepository.count();
        }
        const [items, count] = await this.referancesRepository.findAndCount({
            where,
            order: {
                id: 'ASC'
            },
            skip: offset,
            take: limit,
            ...options
        });
        return {
            items,
            count: startId ? separateCount : count
        }
    }


    async getReferenceById(getReferenceArgs: GetReferenceArgs) {
        const reference = await this.referancesRepository.findOne({ where: { ...getReferenceArgs.referenceDto } });
        if (reference) {
            return reference;
        }
        throw new ProjectNotFoundException(getReferenceArgs.referenceDto.projectID);
    }


    async updateReference(referenceDetails: ReferenceInputDto) {

        const { id } = await this.referancesRepository.findOne({ where: { projectID: referenceDetails.projectID } });
        if (id) {
            await this.referancesRepository.update(id, { ...referenceDetails });
            const updatedPost = await this.referancesRepository.findOne(id);
            return updatedPost;
        }
        throw new ProjectNotFoundException(referenceDetails.projectID);
    }

    async deleteReference(getReferenceArgs: GetReferenceArgs) {
        const { id } = await this.referancesRepository.findOne({ where: { ...getReferenceArgs.referenceDto } });
        const deleteResponse = await this.referancesRepository.delete(id);
        if (deleteResponse) {
            return deleteResponse;
        }
        throw new ProjectNotFoundException(getReferenceArgs.referenceDto.projectID);
    }

}