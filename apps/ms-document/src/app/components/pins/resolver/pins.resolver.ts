import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PinsInputDto } from '../dto/input/pins.input.dto';
import { PinsUpdateInputDto } from '../dto/input/pins.upate.input.dto';
import PinsFilterParams from '../dto/input/pinsFilter.input';
import { PinsShiftUpdateInputDto } from '../dto/input/pinsShift.update.input.dto';
import { PinsStatusUpdateInputDto } from '../dto/input/pinsStatus.upate.input.dto';
import { PinsTaskInfoUpdateInputDto } from '../dto/input/pinsTaskInfo.update.input.dto';
import { PinsModel } from '../model/pins.model';
import { PinsService } from '../service/pins.service';

@Resolver(() => PinsModel)
export class PinsResolver {

    constructor(
        private pinsService: PinsService,
    ) { }

    @Query(() => [PinsModel])
    async pins(@Args("pinsFilter") refFilter: PinsFilterParams
    ) {
        const posts = await this.pinsService.getPinsById(refFilter);
        return posts;
    }

    @Mutation(() => PinsModel)
    async createPins(
        @Args('pinsDetails') pinsInput: PinsInputDto,
    ) {
        return this.pinsService.createPins(pinsInput);
    }

    @Mutation(() => [PinsModel])
    async updatePins(@Args("pinsFilter") refFilter: PinsFilterParams,
        @Args('pinsUpdateDto') pinsUpdateInput: PinsUpdateInputDto,
    ) {
        return this.pinsService.updatePins(refFilter, pinsUpdateInput);
    }

    @Mutation(() => PinsModel)
    async deletePins(@Args("pinsFilter") refFilter: PinsFilterParams
    ) {
        return this.pinsService.deletePins(refFilter);
    }

    @Mutation(() => [PinsModel])
    async updatePinStatus(@Args("pinsFilter") refFilter: PinsFilterParams,
        @Args('pinsStatusUpdateDto') pinsStatusUpdateInput: PinsStatusUpdateInputDto,
    ) {
        return this.pinsService.updatePinStatus(refFilter, pinsStatusUpdateInput);
    }

    @Mutation(() => [PinsModel])
    async shiftPreviousActivePinsToNewVersion(@Args("pinsFilter") refFilter: PinsFilterParams,
        @Args('pinsShiftUpdateDto') pinsShiftUpdateInput: PinsShiftUpdateInputDto,
    ) {
        return this.pinsService.shiftActivePinsToNewVersion(refFilter, pinsShiftUpdateInput);
    }

    @Mutation(() => [PinsModel])
    async updateTaskInfoInPinDetail(@Args("pinsFilter") refFilter: PinsFilterParams,
        @Args('pinsTaskInfoUpdateDto') pinsTaskInfoUpdateInput: PinsTaskInfoUpdateInputDto,
    ) {
        return this.pinsService.updateTaskReferenceInPinDetail(refFilter, pinsTaskInfoUpdateInput);
    }
}
