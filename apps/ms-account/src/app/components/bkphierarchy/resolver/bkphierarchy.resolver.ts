import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { BkpHierarchyEntity } from '../../../entities/bkphierarchy.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import BkpHierarchyFilterParam from '../dto/args/bkp.filter';
import { CreateBkpHierarchyInput } from '../dto/create-bkphierarchy.input';
import { BkpHierarchyModel } from '../model/bkphierarchy.model';
import { BkpHierarchyService } from '../service/bkphierarchy.service';


@Resolver(() => BkpHierarchyModel)
export class BkpHierarchyResolver {
  constructor(
    private readonly bkpHierarchyService: BkpHierarchyService) { }

  @Mutation(() => BkpHierarchyModel)
  async createBkpHierarchy(
    @Args('BkpHierarchyDetails') createBkpHierarchyInput: CreateBkpHierarchyInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return await this.bkpHierarchyService.createBkpHierarchy(createBkpHierarchyInput, referenceFilter);
  }

  @Query(() => [BkpHierarchyModel], { nullable: true })
  async BkpHierarchySearch(@Args('input') input: BkpHierarchyFilterParam ){
      return await this.bkpHierarchyService.searchBkp(input)
  }

}