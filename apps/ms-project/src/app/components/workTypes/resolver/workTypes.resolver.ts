import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { WorkTypeEntity } from '../../../entities/work-type.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { CreateWorkTypeInput } from '../dto/input/create-workType.input';
import { WorkTypeModel } from '../model/workTypes.model';
import { WorkTypesService } from '../service/workTypes.service';

@Resolver(() => WorkTypeModel)
export class WorkTypesResolver {
  constructor(
    private readonly workTypeService: WorkTypesService) { }

  @Query(() => [WorkTypeModel], { nullable: true })
  async workTypes(@Args("referenceFilter") referenceFilter: ReferenceFilterParams): Promise<WorkTypeEntity[]> {
    return await this.workTypeService.findAllWorkType(referenceFilter)
  }

  @Mutation(() => WorkTypeModel)
  async createWorkType(
    @Args('workTypeDetails') createWorkTypeInput: CreateWorkTypeInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.workTypeService.createWorkType(createWorkTypeInput, referenceFilter);
  }

  @Mutation(() => WorkTypeModel)
  async updateWorkType(
    @Args('workTypeDetails') createWorkTypeInput: CreateWorkTypeInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.workTypeService.updateWorkType(createWorkTypeInput, referenceFilter);
  }

}
