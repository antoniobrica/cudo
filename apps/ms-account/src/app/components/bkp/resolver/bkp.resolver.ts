import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { BkpEntity } from '../../../entities/bkp.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { CreateBkpInput } from '../dto/create-bkp.input';
import { BkpModel } from '../model/bkp.model';
import { BkpService } from '../service/bkp.service';


@Resolver(() => BkpModel)
export class BkpResolver {
  constructor(
    private readonly bkpService: BkpService) { }

  @Query(() => [BkpModel], { nullable: true })
  async Bkp(@Args("referenceFilter") referenceFilter: ReferenceFilterParams): Promise<BkpEntity[]> {
    return await this.bkpService.findAllBkp(referenceFilter)
  }

  @Mutation(() => BkpModel)
  async createBkp(
    @Args('bkpeDetails') createBkpInput: CreateBkpInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.bkpService.createBkp(createBkpInput, referenceFilter);
  }

  @Mutation(() => BkpModel)
  async updateBkp(
    @Args('bkpDetails') createBkpInput: CreateBkpInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.bkpService.updateBkp(createBkpInput, referenceFilter);
  }

}
