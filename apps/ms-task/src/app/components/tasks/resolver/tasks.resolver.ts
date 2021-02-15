import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskDetailsInput } from '../dto/input/task-details.input';
import { TasksModel } from '../models/tasks.model';
import { TasksService } from '../service/tasks.service';

@Resolver(() => TasksModel)
export class TasksResolver {

    constructor(
        @Inject('IProjectTasksService')
        private readonly projectTasksService: TasksService) { }

    @Query(() => [TasksModel], { nullable: true })
    async getTasks(): Promise<TasksModel[]> {
        return await this.projectTasksService.findAll()
    }

    @Mutation(() => TasksModel)
    async createTask(
        @Args('taskDetails') createProjectTaskInput: TaskDetailsInput
    ) {
        return this.projectTasksService.create(createProjectTaskInput);
    }

}

