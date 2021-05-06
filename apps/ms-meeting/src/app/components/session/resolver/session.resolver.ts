import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
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
            @Args("referenceFilter") getTasksArgs: ReferenceFilterParams
        ) {
            return this.sessionService.create(createInput, getTasksArgs);
        }
}