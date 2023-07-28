import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { AllModel } from '../model/all';
import { AllService } from '../service/all.service';


@Resolver(() => AllModel)
export class AllResolver {
  constructor(
    private readonly allService: AllService) { }

  @Query(() => AllModel)
  async findAll(@Args("referenceFilter") referenceFilter: ReferenceFilterParams) {
    return  await this.allService.findAll(referenceFilter)
  }

}
