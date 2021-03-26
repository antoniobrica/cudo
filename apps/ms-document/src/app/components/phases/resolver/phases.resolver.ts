import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Phases } from '../../../entities/phases.entity';
import { PhasesService } from '../service/phases.service';



@Resolver(of => Phases)
export class PhasesResolver {
  constructor(
    @Inject(PhasesService) private phasesService: PhasesService) { }

  @Mutation(returns => Phases)
  async createPhase(
    @Args('phaseId') phaseId: number,
    @Args('phaseTitle') phaseTitle: string,
  ): Promise<Phases> {
    return await this.phasesService.create({ phaseTitle, phaseId })
  }

  @Query(returns => Phases)
  async phase(@Args('id') id: number): Promise<Phases> {
    return await this.phasesService.findOne(id);
  }

  @Query(returns => [Phases])
  async phases(): Promise<Phases[]> {
    return await this.phasesService.findAll();
  }
}