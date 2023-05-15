import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, MoreThan, Repository } from 'typeorm';
import ReferanceTypeEntity from '../../../entities/reference-type.entity';
import { ProjectErrorTypeEnum } from '../../../enums/project-error-type.enum';
import ProjectCustomError from '../../../exceptions/projectCustomError.exception';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceInputDto } from '../dto/input/reference.input.dto';
import { ReferenceUpdateInputDto } from '../dto/input/reference.upate.input.dto';

@Injectable()
export class ReferenceService {
  constructor(
    @InjectRepository(ReferanceTypeEntity)
    private referancesRepository: Repository<ReferanceTypeEntity>
  ) {}

  async createReference(referenceDetails: ReferenceInputDto) {
    const newReferance = await this.referancesRepository.create(
      new ReferanceTypeEntity({
        ...referenceDetails,
      })
    );
    await this.referancesRepository.save(newReferance);
    return newReferance;
  }

  async getReference(
    offset?: number,
    limit?: number,
    startId?: number,
    options?: FindManyOptions<ReferanceTypeEntity>
  ) {
    const where: FindManyOptions<ReferanceTypeEntity>['where'] = {};
    let separateCount = 0;
    if (startId) {
      where.id = MoreThan(startId);
      separateCount = await this.referancesRepository.count();
    }
    const [items, count] = await this.referancesRepository.findAndCount({
      where,
      order: {
        id: 'ASC',
      },
      skip: offset,
      take: limit,
      ...options,
    });
    return {
      items,
      count: startId ? separateCount : count,
    };
  }

  async getReferenceById(refFilter: ReferenceFilterParams) {

    const reference = await this.referancesRepository.findOne({ where: { ...refFilter } });
    if (reference) {
      return reference;
    }
    
    throw new ProjectCustomError(ProjectErrorTypeEnum.PROJECT_NOT_FOUND);
  }

  async updateReference(refFilter: ReferenceFilterParams, referenceDetails: ReferenceUpdateInputDto) {
    const reference = await this.referancesRepository.findOne({ where: { ...refFilter } });
    if (reference) {
      await this.referancesRepository.update(reference.id, { ...referenceDetails });
      const updatedPost = await this.referancesRepository.findOne({ where: { id: reference.id } });
      return updatedPost;
    }
    throw new ProjectCustomError(ProjectErrorTypeEnum.PROJECT_NOT_FOUND);
  }

  async deleteReference(refFilter: ReferenceFilterParams) {
    const { id } = await this.referancesRepository.findOne({ where: { ...refFilter } });
    const deleteResponse = await this.referancesRepository.delete(id);
    if (deleteResponse) {
      return deleteResponse;
    }
    throw new ProjectCustomError(ProjectErrorTypeEnum.PROJECT_NOT_FOUND);
  }
}
