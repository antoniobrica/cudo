import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import MeetingEntity from '../../../entities/meeting.entity';

import { Pagination } from '../../paginate';
import { PaginationMeetingModel } from '../../paginate/pagination.meeting.model'

import { pageParams } from '../../paginate/pagination.param';
import MeetingFilterParam from '../dto/args/meeting.filter';
import MeetingDetailFilterParam from '../dto/args/meeting.detail.filter';
import SortFilterParam from '../../../utils/types/sortParam';
import StatusFilterParam from '../../../utils/types/status.filter';

import { MeetingDeleteInput } from '../dto/input/meeting-delete.input';
import { MeetingDetailsUpdateInput } from '../dto/input/meeting-details-update.input';
import { MeetingDetailsInput } from '../dto/input/meeting-details.input';
import { MeetingModel } from '../model/meeting.model';
import { MeetingService } from '../service/meeting.service';

@Resolver(() => MeetingModel)
export class MeetingResolver {

    constructor(
        private readonly meetingService: MeetingService) { }

    @Mutation(() => MeetingModel)
    async createMeeting(
        @Args('meetingDetails') createInput: MeetingDetailsInput,
    ) {
        return this.meetingService.addMeeting(createInput);        
    }

    @Query(() => PaginationMeetingModel, { nullable: true })
    async getMeetingList(
        @Args('options', { nullable: true }) options: pageParams,
        @Args('meetingFilter',) meetingFilter?: MeetingFilterParam,
        @Args("statusFilter", { nullable: true }) status?: StatusFilterParam,
        @Args("sortFilter", { nullable: true }) sortFilter?: SortFilterParam,
    ): Promise<Pagination<MeetingEntity>> {
        return await this.meetingService.findMeetingList(options, meetingFilter, status, sortFilter
        )
    }

    @Query(() => MeetingModel)
    async getMeetingById(@Args("meetingDetailFilter") meetingDetailFilter?: MeetingDetailFilterParam
    ) {
        const meeting = await this.meetingService.findMeetingById(meetingDetailFilter);
        return meeting;
    }

    @Mutation(() => MeetingModel)
    async updateMeeting(
        @Args('meetingUpdateInput') meetingUpdateInput: MeetingDetailsUpdateInput
    ) {
        return this.meetingService.updateMeetingById(meetingUpdateInput);
    }

    @Mutation(() => MeetingModel)
    async deleteMeeting(
        @Args('meetingDeleteInput') meetingDeleteInput: MeetingDeleteInput
    ) {
        return this.meetingService.deleteMeetingById(meetingDeleteInput);
    }
}