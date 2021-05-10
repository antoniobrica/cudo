import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Structure } from '../../../entities/structure.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { StructureFilterArgs } from '../dto/args/structure-filter.args';
import { CreateStructureInput } from '../dto/create-Structure.input';
import { UpdateStructureInput } from '../dto/update-Structure.input';
import { StructureModel } from '../model/structure.model';
import { StructureService } from '../service/structure.service';

@Resolver(() => StructureModel)
export class StructureResolver {
  constructor(
    private readonly StructureService: StructureService) { }

  @Query(() => [StructureModel], { nullable: true })
  async structureRoots(@Args("referenceFilter") referenceFilter: ReferenceFilterParams): Promise<Structure[]> {
    return await this.StructureService.findStructureRoots(referenceFilter)
  }

  @Query(() => StructureModel, { nullable: true })
  async structureChilds(@Args() structureFilterArgs: StructureFilterArgs): Promise<Structure> {
    return await this.StructureService.findStructureChilds(structureFilterArgs)
  }

  @Mutation(() => StructureModel)
  async createStructure(
    @Args('structureDetails') createStructureInput: CreateStructureInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.StructureService.createStructure(createStructureInput, referenceFilter);
  }

  @Mutation(() => StructureModel)
  async updateStructure(
    @Args('updateStructureInput') updateStructureInput: UpdateStructureInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.StructureService.updateStructure(updateStructureInput, referenceFilter);
  }

  // @Mutation(() => StructureModel)
  // async deleteStructure(
  //   @Args('updateStructureInput') updateStructureInput: UpdateStructureInput,
  //   @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  // ) {
  //   return this.StructureService.deleteStructure(updateStructureInput, referenceFilter);
  // }
}
