import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetTasksArgs } from '../dto/args/get-tasks.args';
import { TaskDetailsInput } from '../dto/input/task-details.input';
import { TasksModel } from '../models/tasks.model';
import { TasksService } from '../service/tasks.service';

@Resolver(() => TasksModel)
export class TasksResolver {

    constructor(
        private readonly projectTasksService: TasksService) { }

    @Query(() => [TasksModel], { nullable: true })
    async tasks(@Args() getTasksArgs: GetTasksArgs): Promise<TasksModel[]> {
        return await this.projectTasksService.findAll(getTasksArgs)
    }

    @Mutation(() => TasksModel)
    async createTask(
        @Args('taskDetails') createProjectTaskInput: TaskDetailsInput
    ) {
        return this.projectTasksService.create(createProjectTaskInput);
    }

}

