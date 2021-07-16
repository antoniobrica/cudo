import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import MeetingEntity from '../../../entities/meeting.entity';
// import ReferenceFilterParams from '../../../utils/types/referenceFilterParams'; 

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
            // @Args("referenceFilter") getReferenceArgs: ReferenceFilterParams,
        ) {
            // return this.meetingService.create(createInput, getTasksArgs);
            return this.meetingService.addMeeting(createInput);
        }

        @Query(() => PaginationMeetingModel, { nullable: true })
        async getMeetingList(
            @Args('options',{nullable: true}) options: pageParams,
            @Args('meetingFilter',) meetingFilter?: MeetingFilterParam,
            @Args("statusFilter",{nullable: true}) status?:StatusFilterParam,
            @Args("sortFilter",{nullable: true}) sortFilter?:SortFilterParam,
        ) : Promise<Pagination<MeetingEntity>> {
                return await this.meetingService.findMeetingList(options, meetingFilter,  status, sortFilter
            )           
        }       

        @Query(() => MeetingModel)
        async getMeetingByID(@Args("meetingDetailFilter") meetingDetailFilter?: MeetingDetailFilterParam
        ) {
                const meeting = await this.meetingService.findMeetingByID(meetingDetailFilter);
                return meeting;
            }
            
        // #region Commented Sample Session code       
        // @Mutation(() => [SessionModel])
        // async updateSession(
        //     @Args('sessionDetailsUpdate') createInput: SessionDetailsUpdateInput
        // ) {
        //     return this.sessionService.updateSessionByID(createInput);
        // }

        // @Mutation(() => [SessionModel])
        // async deleteSession(
        //     @Args('sessionDeleteInput') sessionDeleteInput: SessionDeleteInput
        // ) {
        //     return this.sessionService.deleteSessionByID(sessionDeleteInput);
        // }
        // #endregion
}