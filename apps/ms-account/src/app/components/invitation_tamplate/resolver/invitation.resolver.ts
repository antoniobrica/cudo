import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { InvitationTemplateEntity } from '../../../entities/invitaion.templet.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { CreateInvitationTemplateInput } from '../dto/create-invitation-tamplate.input';
import { UpdateInvitationTemplate } from '../dto/update-invitation.input';
import { InvitationTemplateModel } from '../model/invitation.model';
import { InvitationTemplateService } from '../service/invitation.tamplate.service';


@Resolver(() => InvitationTemplateModel)
export class InvitationTemplateResolver {
  constructor(
    private readonly invitationService: InvitationTemplateService) { }

  @Query(() => [InvitationTemplateModel], { nullable: true })
  async MeetingCatagories(@Args("referenceFilter") referenceFilter: ReferenceFilterParams): Promise<InvitationTemplateEntity[]> {
    return await this.invitationService.findAllInvitationTemplate(referenceFilter)
  }

  @Mutation(() => InvitationTemplateModel)
  async createInvitationTemplate(
    @Args('InvitationTemplateDetails') createInput: CreateInvitationTemplateInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.invitationService.createInvitationTemplate(createInput, referenceFilter);
  }

  @Mutation(() => InvitationTemplateModel)
  async updateInvitationTemplate(
    @Args('InvitationTemplateFilter') update: UpdateInvitationTemplate,
    @Args('InvitationTemplateDetails') createInput: CreateInvitationTemplateInput,
  ) {
    return this.invitationService.updateInvitationTemplate(update,createInput);
  }

  @Mutation(() => [InvitationTemplateModel])
  async deleteInvitationTemplate(
      @Args('CatagoryDeleteInput') DeleteInput: UpdateInvitationTemplate
  ) {
      return this.invitationService.deleteInvitationTemplateByID(DeleteInput);
  }

}
