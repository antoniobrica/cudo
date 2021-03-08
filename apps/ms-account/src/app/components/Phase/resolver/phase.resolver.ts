import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PhaseEntity } from '../../../entities/phase.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { CreatePhaseInput } from '../dto/args/create-phase.input';
import { phaseModel } from '../model/phase.model';
import { PhaseService } from '../service/phase.service';


@Resolver(() => phaseModel)
export class PhaseResolver {
  constructor(
    private readonly phaseService: PhaseService) { }

  @Query(() => [phaseModel], { nullable: true })
  async Phase(@Args("referenceFilter") referenceFilter: ReferenceFilterParams): Promise<PhaseEntity[]> {
    return await this.phaseService.findAllPhase(referenceFilter)
  }

  @Mutation(() => phaseModel)
  async createPhase(
    @Args('phaseDetails') createPhaseInput: CreatePhaseInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.phaseService.createPhase(createPhaseInput, referenceFilter);
  }

}
