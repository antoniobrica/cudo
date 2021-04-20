import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import TaskFilterParams from '../../../utils/types/taskFilterParams';
import { TaskDetailsUpdateInput } from '../dto/input/task-details-update.input';
import { TaskDetailsInput } from '../dto/input/task-details.input';
import { TasksModel } from '../models/tasks.model';
import { TasksService } from '../service/tasks.service';

@Resolver(() => TasksModel)
export class TasksResolver {

    constructor(
        private readonly projectTasksService: TasksService) { }

    @Query(() => [TasksModel], { nullable: true })
    async tasks(@Args("referenceFilter") getTasksArgs: ReferenceFilterParams): Promise<TasksModel[]> {
        return await this.projectTasksService.findAll(getTasksArgs)
    }

    @Query(() => [TasksModel], { nullable: true })
    async taskById(@Args("taskFilterParams") taskFilterParams: TaskFilterParams): Promise<TasksModel[]> {
        return await this.projectTasksService.findTaskById(taskFilterParams)
    }

    @Mutation(() => TasksModel)
    async createTask(
        @Args('taskDetails') createProjectTaskInput: TaskDetailsInput,
        @Args("referenceFilter") getTasksArgs: ReferenceFilterParams
    ) {
        return this.projectTasksService.create(createProjectTaskInput, getTasksArgs);
    }

    @Mutation(() => [TasksModel])
    async updateTask(
        @Args('taskDetailsUpdate') createProjectTaskInput: TaskDetailsUpdateInput
    ) {
        return this.projectTasksService.updateTaskByID(createProjectTaskInput);
    }

    @Mutation(() => TasksModel)
    async deleteTask(@Args("taskFilter") taskFilter: TaskFilterParams
    ) {
        return this.projectTasksService.deleteTask(taskFilter);
    }

}

