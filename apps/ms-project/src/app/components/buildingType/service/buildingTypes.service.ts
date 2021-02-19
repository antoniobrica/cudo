import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { BuildingTypeEntity } from '../../../entities/building-type.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { CreateBuildingTypeInput } from '../dto/create-buildingType.input';
import BuildingTypeNotFoundException from '../exceptions/buildingTypeNotFound.exception';


@Injectable()
export class BuildingTypesService {
  constructor(
    @InjectRepository(BuildingTypeEntity)
    private BuildingTypeRepository: Repository<BuildingTypeEntity>,
    private referenceService: ReferenceService,
  ) { }

  public async createBuildingType(createBuildingTypeInput: CreateBuildingTypeInput, referenceFilter: ReferenceFilterParams): Promise<BuildingTypeEntity> {
    try {
      const taskeDetails = new BuildingTypeEntity({ ...createBuildingTypeInput });
      const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
      const newPost = await this.BuildingTypeRepository.create({
        ...taskeDetails,
        reference: { id: selectedReference.id }
      });
      await this.BuildingTypeRepository.save(newPost);
      return newPost;
    } catch (error) {
      return error;
    }
  }

  public async updateBuildingType(createBuildingTypeInput: CreateBuildingTypeInput, referenceFilter: ReferenceFilterParams): Promise<BuildingTypeEntity> {

    const selectedReference = await this.referenceService.getReferenceById(referenceFilter);
    const buildingType = await this.BuildingTypeRepository.findOne({ where: { buildingTypeID: createBuildingTypeInput.buildingTypeID, reference: { id: selectedReference.id } } });
    if (buildingType) {
      await this.BuildingTypeRepository.update(buildingType.id, { ...createBuildingTypeInput });
      const updatedPost = await this.BuildingTypeRepository.findOne(buildingType.id);
      return updatedPost;
    }
    throw new BuildingTypeNotFoundException(buildingType.buildingTypeID);
  }

  public async findAllBuildingType(refFilter: ReferenceFilterParams): Promise<BuildingTypeEntity[]> {
    const selectedReference = await this.referenceService.getReferenceById(refFilter)
    return await this.BuildingTypeRepository.find({
      "reference": {
        id: selectedReference.id
      }
    });

  }

}