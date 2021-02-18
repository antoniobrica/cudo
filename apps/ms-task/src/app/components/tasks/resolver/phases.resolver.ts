
import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Phases } from '../../../entities/phases.entity';
import { PhasesService } from '../service/phases.service';




@Resolver(of => Phases)
export class PhasesResolver {
  constructor(
    @Inject(PhasesService) private phaseService: PhasesService) { }


  @Mutation(returns => Phases)
  async createPhase(
    @Args('phaseTitle') phaseTitle: string,
    @Args('companyId') companyId: number,
    @Args('clientId') clientId: number,
  ): Promise<Phases> {
    return await this.phaseService.create({ phaseTitle, companyId,clientId })
  }

  @Query(returns => Phases)
  async phase(@Args('id') id: number): Promise<Phases> {
    return await this.phaseService.findOne(id);
  }

  @Query(returns => [Phases])
  async phases(): Promise<Phases[]> {
    return await this.phaseService.findAll();
  }
}