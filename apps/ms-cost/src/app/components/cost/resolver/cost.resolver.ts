import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CostEntity } from '../../../entities/cost.entity';
import CostFilterParams from '../../../utils/types/costFilterParams';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { BkpDeleteInput } from '../dto/args/delete.bkp';
import { CreateBkpHierarchyInput } from '../dto/create-bkphierarchy.input';
import { CreateCostInput } from '../dto/create-cost.input';
import { BKPcostDeleteInput } from '../dto/delete-BKPCost.input';
import { CostDeleteInput } from '../dto/delete-cost.input';
import { UpdateBkpCostBasicInput } from '../dto/update-bkp-cost.input';
import { UpdateBKPLayerTwo } from '../dto/update-bkp-layer-two.input';
import { AddLayerTwoBkpHierarchyInput } from '../dto/update-bkphierarchy.input';
import { BKPCostModel } from '../model/bkp-cost.model';
import { bkpLayerTwoModel } from '../model/bkp-layerTwo.model';
import { BkpHierarchyModel } from '../model/bkphierarchy.model';
import { CostModel } from '../model/cost.model';
import { CostService } from '../service/cost.service';


@Resolver(() => CostModel)
export class CostResolver {
  constructor(
    private readonly costService: CostService) { }

  @Query(() => [CostModel], { nullable: true })
  async costs(@Args("referenceFilter") referenceFilter: ReferenceFilterParams): Promise<CostEntity[]> {
    return await this.costService.findAllCost(referenceFilter)
  }

  @Mutation(() => CostModel)
  async createCost(
    @Args('costDetails') createCostInput: CreateCostInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return await this.costService.createCost(createCostInput, referenceFilter);
  }

  @Mutation(() => [BKPCostModel])
  async updateBkpCost(
    @Args('bkpCostDetailsUpdate') updateBkpCostBasicInput: UpdateBkpCostBasicInput
  ) {
    return this.costService.updateBKPCostID(updateBkpCostBasicInput);
  }

  @Query(() => [CostModel], { nullable: true })
  async costsByID(@Args("referenceFilter") referenceFilter: ReferenceFilterParams,
    @Args("costFilterParams") costFilterParams: CostFilterParams): Promise<CostEntity[]> {
    return await this.costService.findCostByID(referenceFilter, costFilterParams)
  }

  @Mutation(() => CostModel)
  async deleteCost(
    @Args('costFilter') costDeleteInput: CostDeleteInput,
  ) {
    return this.costService.deleteCost(costDeleteInput);
  }

  @Mutation(() => CostModel)
  async deleteBKPCost(
    @Args('BKPcostFilter') BKPcostDeleteInput: BKPcostDeleteInput,
  ) {
    return this.costService.deleteBKPCost(BKPcostDeleteInput);
  }










  // code by ajay
  @Mutation(() => BkpHierarchyModel)
  async createBkpHierarchy(
    @Args('BkpHierarchyDetails') createBkpHierarchyInput: CreateBkpHierarchyInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return await this.costService.createBkpHierarchy(createBkpHierarchyInput, referenceFilter);
  }

  // add level three bkpcost on the basis of bkp hierarchy
  @Mutation(() => [BkpHierarchyModel])
  async createBkpCost(
    @Args('addLayerTwoBkpHierarchy') addLayerTwoBkpHierarchy: AddLayerTwoBkpHierarchyInput,
    @Args('referenceFilter') referenceFilter: ReferenceFilterParams
  ) {
    return this.costService.createBkpCost(addLayerTwoBkpHierarchy, referenceFilter)
  }

  // get all top level bkps
  @Query(() => [BkpHierarchyModel])
  async getBkps(@Args('refFilter') refFilter: ReferenceFilterParams) {
    return await this.costService.getBkps(refFilter)
  }

  // update level three bkp cost
  @Mutation(() => bkpLayerTwoModel)
  async updateBkpCostById(
    @Args('updateBKPLayerTwo') updateBKPLayerTwo: UpdateBKPLayerTwo
  ) {
    return this.costService.updateBkpCost(updateBKPLayerTwo)
  }

  // delete any level bkp with bkpcostID
  @Mutation(() => BkpHierarchyModel)
  async deleteBkp(
    @Args('bkpDeleteInput') bkpDeleteInput: BkpDeleteInput,
  ) {
    return this.costService.deleteBkp(bkpDeleteInput);
  }

}
