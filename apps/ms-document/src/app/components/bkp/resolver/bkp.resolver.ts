import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { BKP } from '../../../entities/bkp.entity';
import { BkpService } from '../service/bkp.service';

@Resolver(of => BKP)
export class BkpResolver {
  constructor(
    @Inject(BkpService) private bkpService: BkpService) { }

    
  @Mutation(returns => BKP)
  async createBkp(
    @Args('bkpId') BKPID: string,
    @Args('bkpTitle') bkpTitle: string,
  ): Promise<BKP> {
    return await this.bkpService.create({ BKPID,bkpTitle })
  }

  @Query(returns => BKP)
  async bkp(@Args('id') id: number): Promise<BKP> {
    return await this.bkpService.findOne(id);
  }

  @Query(returns => [BKP])
  async bkps(): Promise<BKP[]> {
    return await this.bkpService.findAll();
  }
}