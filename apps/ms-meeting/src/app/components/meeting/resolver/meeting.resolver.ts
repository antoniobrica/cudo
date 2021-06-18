import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import MeetingEntity from '../../../entities/meeting.entity';
// import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { Pagination } from '../../paginate';
import { PaginationModel } from '../../paginate/pagination.model';
import { pageParams } from '../../paginate/pagination.param';
import MeetingFilterParam from '../dto/args/meeting.filter';
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
            return this.meetingService.create(createInput);
        }

        // @Query(() => MeetingModel)
        // // async getMeetingList(@Args("meetingFilter") meetingFilter?: MeetingFilterParam
        // async getMeetingList() {
        //     const meetings = await this.meetingService.getMeetingList();
        //     return meetings;
        // }

        // #region Commented Sample Session code
        // @Query(() => SessionModel)
        // async SessionByID(@Args("sessionFilter") sessionFilter?: SessionFilterParam
        // ) {
        //     const session = await this.sessionService.getSessionID(sessionFilter);
        //     return session;
        // }

        // @Query(() => PaginationModel, { nullable: true })
        // async paginatedSession(@Args('options',)options:pageParams,
        // @Args("referenceFilter") getTasksArgs: ReferenceFilterParams): Promise<Pagination<SessionEntity>>  {
        //     return await this.sessionService.paginate(options,getTasksArgs
        //       )
        // }

        // @Query(() => [SessionModel], { nullable: true })
        // async findAllSessions(): Promise<SessionEntity[]> {
        //   return await this.sessionService.findAllSessions()
        // }



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