import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { MilestoneDetailsInput } from '../dto/input/milestone-details.input';
import { MileStoneModel } from '../model/milestone.model';
import { MileStoneService } from '../service/milestone.service';

@Resolver(() => MileStoneModel)
export class MileStoneResolver {

    constructor(
        private readonly mileStoneService: MileStoneService) { }


    @Mutation(() => MileStoneModel)
    async createMileStone(
        @Args('mileStoneDetails') createMileStoneInput: MilestoneDetailsInput,
        @Args("referenceFilter") getMileStoneArgs: ReferenceFilterParams
    ) {
        return this.mileStoneService.create(createMileStoneInput, getMileStoneArgs);
    }


}

