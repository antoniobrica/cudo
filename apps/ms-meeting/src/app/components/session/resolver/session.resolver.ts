import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import SessionEntity from '../../../entities/session.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { Pagination } from '../../paginate';
import { PaginationModel } from '../../paginate/pagination.model';
import { pageParams } from '../../paginate/pagination.param';
import SessionFilterParam from '../dto/args/session.filter';
import { SessionDetailsInput } from '../dto/input/session-details.input';
import { SessionModel } from '../model/session.model';
import { SessionService } from '../service/session.service';


@Resolver(() => SessionModel)
export class SessionResolver {

    constructor(
        private readonly sessionService: SessionService) { }

        @Mutation(() => SessionModel)
        async createSession(
            @Args('sessionDetails') createInput: SessionDetailsInput,
            @Args("referenceFilter") getTasksArgs: ReferenceFilterParams,
        ) {
            return this.sessionService.create(createInput, getTasksArgs);
        }

        @Query(() => SessionModel)
        async SessionByID(@Args("sessionFilter") sessionFilter?: SessionFilterParam
        ) {
            const session = await this.sessionService.getSessionID(sessionFilter);
            return session;
        }

        @Query(() => PaginationModel, { nullable: true })
        async paginatedSession(@Args('options',)options:pageParams,
        @Args("referenceFilter") getTasksArgs: ReferenceFilterParams): Promise<Pagination<SessionEntity>>  {
            return await this.sessionService.paginate(options,getTasksArgs
              )
        }

        @Query(() => [SessionModel], { nullable: true })
        async findAllSessions(): Promise<SessionEntity[]> {
          return await this.sessionService.findAllSessions()
        }
}