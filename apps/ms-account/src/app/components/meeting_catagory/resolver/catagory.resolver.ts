import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { MeetingCatagoryEntity } from '../../../entities/meeting.catagory.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { CreateMeetCatagoryInput } from '../dto/create-meeting-catagory.input';
import { UpdateMeetingCatagory } from '../dto/update-folder.input';
import { MeetingCatagoryModel } from '../model/catagory.model';
import { MeetingCatagoryService } from '../service/meeting.catagory.service';





@Resolver(() => MeetingCatagoryModel)
export class MeetingCatagoryResolver {
  constructor(
    private readonly catagoryService: MeetingCatagoryService) { }

  @Query(() => [MeetingCatagoryModel], { nullable: true })
  async MeetingCatagories(@Args("referenceFilter") referenceFilter: ReferenceFilterParams): Promise<MeetingCatagoryEntity[]> {
    return await this.catagoryService.findAllMeetingCatagory(referenceFilter)
  }

  @Mutation(() => MeetingCatagoryModel)
  async createMeetingCatagory(
    @Args('meetingCatagoryDetails') createInput: CreateMeetCatagoryInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.catagoryService.createMeetingCatagory(createInput, referenceFilter);
  }

  @Mutation(() => MeetingCatagoryModel)
  async updateMeetingCatagory(
    @Args('meetingCatagoryFilter') update: UpdateMeetingCatagory,
    @Args('meetingCatagoryDetails') createInput: CreateMeetCatagoryInput,
  ) {
    return this.catagoryService.updateMeetingCatagory(update,createInput);
  }

  @Mutation(() => [MeetingCatagoryModel])
  async deleteMeetingCatagory(
      @Args('CatagoryDeleteInput') DeleteInput: UpdateMeetingCatagory
  ) {
      return this.catagoryService.deleteMeetingCatagoryByID(DeleteInput);
  }

}
