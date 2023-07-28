import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuildingTypeEntity } from '../../../entities/building-type.entity';
import { ProjectErrorTypeEnum } from '../../../enums/project-error-type.enum';
import ProjectCustomError from '../../../exceptions/projectCustomError.exception';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { CreateBuildingTypeInput } from '../dto/create-buildingType.input';

@Injectable()
export class BuildingTypesService {
  constructor(
    @InjectRepository(BuildingTypeEntity)
    private BuildingTypeRepository: Repository<BuildingTypeEntity>,
    private referenceService: ReferenceService
  ) {}

  public async createBuildingType(
    createBuildingTypeInput: CreateBuildingTypeInput,
    referenceFilter: ReferenceFilterParams
  ): Promise<BuildingTypeEntity> {
    try {
      const taskeDetails = new BuildingTypeEntity({ ...createBuildingTypeInput });
      const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
      const newbuildingType = await this.BuildingTypeRepository.create({
        ...taskeDetails,
        reference: { id: selectedReference.id },
      });
      await this.BuildingTypeRepository.save(newbuildingType);
      return newbuildingType;
    } catch (error) {
      return error;
    }
  }

  public async updateBuildingType(
    createBuildingTypeInput: CreateBuildingTypeInput,
    referenceFilter: ReferenceFilterParams
  ): Promise<BuildingTypeEntity> {
    const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
    const buildingType = await this.BuildingTypeRepository.findOne({
      where: { buildingTypeID: createBuildingTypeInput.buildingTypeID, reference: { id: selectedReference.id } },
    });
    if (buildingType) {
      await this.BuildingTypeRepository.update(buildingType.id, { ...createBuildingTypeInput });
      const updatedPost = await this.BuildingTypeRepository.findOne({ where: { id: buildingType.id } });
      return updatedPost;
    }
    throw new ProjectCustomError(ProjectErrorTypeEnum.BUILDING_NOT_FOUND);
  }

  public async findAllBuildingType(refFilter: ReferenceFilterParams): Promise<BuildingTypeEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(refFilter);
    return await this.BuildingTypeRepository.find({
      where: { reference: { id: selectedReference.id } },
    });
  }
}
