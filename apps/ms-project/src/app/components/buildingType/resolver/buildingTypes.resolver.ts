import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { BuildingTypeEntity } from '../../../entities/building-type.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { CreateBuildingTypeInput } from '../dto/create-buildingType.input';
import { BuildingTypeModel } from '../model/buildingTypes.model';
import { BuildingTypesService } from '../service/buildingTypes.service';


@Resolver(() => BuildingTypeModel)
export class BuildingTypesResolver {
  constructor(
    private readonly buildingTypeService: BuildingTypesService) { }

  @Query(() => [BuildingTypeModel], { nullable: true })
  async buildingTypes(@Args("referenceFilter") referenceFilter: ReferenceFilterParams): Promise<BuildingTypeEntity[]> {
    return await this.buildingTypeService.findAllBuildingType(referenceFilter)
  }

  @Mutation(() => BuildingTypeModel)
  async createBuildingType(
    @Args('buildingTypeDetails') createBuildingTypeInput: CreateBuildingTypeInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.buildingTypeService.createBuildingType(createBuildingTypeInput, referenceFilter);
  }

  @Mutation(() => BuildingTypeModel)
  async updateBuildingType(
    @Args('buildingTypeDetails') createBuildingTypeInput: CreateBuildingTypeInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.buildingTypeService.updateBuildingType(createBuildingTypeInput, referenceFilter);
  }

}
