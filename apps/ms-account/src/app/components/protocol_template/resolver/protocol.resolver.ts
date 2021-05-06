import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProtocolEntity } from '../../../entities/protocol.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { CreateProtocolInput } from '../dto/create-portocol.input';
import { UpdateProtocol } from '../dto/update-protocol.input';
import { ProtocolModel } from '../model/protocol.model';
import { ProtocolTemplateService } from '../service/protocol.service';



@Resolver(() => ProtocolModel)
export class ProtocolTemplateResolver {
  constructor(
    private readonly protocolService: ProtocolTemplateService) { }

  @Query(() => [ProtocolModel], { nullable: true })
  async ProtocoleTemplates(@Args("referenceFilter") referenceFilter: ReferenceFilterParams): Promise<ProtocolEntity[]> {
    return await this.protocolService.findAllProtocol(referenceFilter)
  }

  @Mutation(() => ProtocolModel)
  async createProtocolTemplate(
    @Args('protocolTemplateDetails') createInput: CreateProtocolInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.protocolService.createProtocol(createInput, referenceFilter);
  }

  @Mutation(() => ProtocolModel)
  async updateProtocolTemplate(
    @Args('protocolTemplateFilter') update: UpdateProtocol,
    @Args('protocolDetails') createInput: CreateProtocolInput,
  ) {
    return this.protocolService.updateProtocol(update,createInput);
  }

  @Mutation(() => [ProtocolModel])
  async deleteProtocolTemplate (
      @Args('protocolDeleteInput') DeleteInput: UpdateProtocol
  ) {
      return this.protocolService.deleteProtocolByID(DeleteInput);
  }

}
