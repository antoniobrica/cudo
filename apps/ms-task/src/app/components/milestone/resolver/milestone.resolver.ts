import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import MileStoneFilterParam from '../dto/args/milestone.filter';
import { MileStoneDetailsUpdateInput } from '../dto/input/milestone-update.input';
import { MileStoneModel } from '../model/milestone.model';
import { MileStoneService } from '../service/milestone.service';

@Resolver(() => MileStoneModel)
export class MileStoneResolver {

    constructor(
        private readonly mileStoneService: MileStoneService) { }


    @Mutation(() => MileStoneModel)
    async createMileStone(
        @Args('mileStoneDetails') createMileStoneInput: MileStoneDetailsUpdateInput,
        @Args("referenceFilter") getMileStoneArgs: ReferenceFilterParams
    ) {
        return this.mileStoneService.create(createMileStoneInput, getMileStoneArgs);
    }

    @Query(() => [MileStoneModel], { nullable: true })
    async MileStones(@Args("referenceFilter") getTasksArgs: ReferenceFilterParams): Promise<MileStoneModel[]> {
        return await this.mileStoneService.findAll(getTasksArgs)
    }


    @Query(() => MileStoneModel)
    async MileStoneByID(@Args("milestoneFilter") mileFilter?: MileStoneFilterParam
    ) {
        const milestone = await this.mileStoneService.getMileStoneByID(mileFilter);
        return milestone;
    }

    @Mutation(() => MileStoneModel)
    async deleteMileStone(@Args("milestoneFilter") mileFilter: MileStoneFilterParam
    ) {
        return this.mileStoneService.deleteMileStone(mileFilter);
    }

}

