import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReferenceInput } from '../dto/input/reference.input';
import { ReferenceModel } from '../model/reference';
import { ReferenceService } from '../service/reference.service';

@Resolver(() => ReferenceModel)
export class ReferenceResolver {

    constructor(
        @Inject('IReferenceService')
        private readonly projectTasksService: ReferenceService) { }

    @Query(() => [ReferenceModel], { nullable: true })
    async getTasks(): Promise<ReferenceModel[]> {
        return await this.projectTasksService.findAll()
    }

    @Mutation(() => ReferenceModel)
    async createTask(
        @Args('taskDetails') createProjectTaskInput: ReferenceInput
    ) {
        return this.projectTasksService.create(createProjectTaskInput);
    }
}
