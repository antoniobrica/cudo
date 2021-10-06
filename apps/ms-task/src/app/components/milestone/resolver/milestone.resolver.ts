import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import MileStoneFilterParam from '../dto/args/milestone.filter';
import { MilestoneDetailsInput } from '../dto/input/milestone-details.input';
import { MileStoneDetailsUpdateInput } from '../dto/input/milestone-update.input';
import { MileStoneModel } from '../model/milestone.model';
import { MileStoneService } from '../service/milestone.service';
import { pageParams } from '../../paginate/pagination.param';
import { PaginationModel } from '../../paginate/pagination.model';
import { MileStoneEntity } from '../../../entities/milestone.entity';
import { Pagination } from '../../paginate';
import MileStonesFilterParam from '../dto/args/milestones.filter';

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

    @Query(() => [MileStoneModel], { nullable: true })
    async MileStones(
        @Args("referenceFilter") getTasksArgs: ReferenceFilterParams,
    ): Promise<MileStoneModel[]> {
        return await this.mileStoneService.findAll(getTasksArgs)
    }

    // modified code for filter
    
    // @Query(() => [MileStoneModel], { nullable: true })
    // async MileStones(
    //     @Args("referenceFilter") getTasksArgs: ReferenceFilterParams,
    //     @Args("filterOptions") filterOptions: MileStonesFilterParam
    // ): Promise<MileStoneModel[]> {
    //     return await this.mileStoneService.findAll(getTasksArgs, filterOptions)
    // }


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

    @Mutation(() => [MileStoneModel])
    async updateMileStone(
        @Args('milestoneDetailsUpdate') milestoneDetailsUpdate: MileStoneDetailsUpdateInput
    ) {
        return this.mileStoneService.updateMileStoneByID(milestoneDetailsUpdate);
    }

    @Query(() => PaginationModel, { nullable: true })
    async paginatedMileStone(@Args('options') options: pageParams,
        @Args("referenceFilter") getTasksArgs: ReferenceFilterParams): Promise<Pagination<MileStoneEntity>> {
        return await this.mileStoneService.paginate(options, getTasksArgs
        )
    }

}

