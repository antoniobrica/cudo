import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PinsInputDto } from '../dto/input/pins.input.dto';
import { PinsUpdateInputDto } from '../dto/input/pins.upate.input.dto';
import PinsFilterParams from '../dto/input/pinsFilter.input';
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
}
