import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import SubTaskParams from '../../../utils/types/subtask.param.';
import TaskFilterParams from '../../../utils/types/taskFilterParams';
import SubTaskInput from '../dto/input/create-subtask.input';
import { SubTaskDeleteInput } from '../dto/input/subtask-delete.input';
import { TaskDeleteInput } from '../dto/input/task-delete.input';
import { TaskDetailsUpdateInput } from '../dto/input/task-details-update.input';
import { TaskDetailsInput } from '../dto/input/task-details.input';
import { SubTaskModel } from '../models/subtask.model';
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

    @Mutation(() => [TasksModel])
    async deleteTask(
        @Args('taskDeleteInput') taskDeleteInput: TaskDeleteInput
    ) {
        return this.projectTasksService.deleteTaskByID(taskDeleteInput);
    }

    @Mutation(() => [SubTaskModel])
    async deletesubTask(
        @Args('subtaskDeleteInput') taskDeleteInput: SubTaskDeleteInput
    ) {
        return this.projectTasksService.deletesubTaskByID(taskDeleteInput);
    }

    // @Mutation(() => SubTaskModel)
    // async deleteSubTask(@Args("subtaskFilter") mileFilter: SubTaskDeleteInput
    // ) {
    //     return this.projectTasksService.deleteSubTaskByID(mileFilter);
    // }

    // @Mutation(() => SubTaskModel)
    // async updateSubTask(
    //   @Args('subTask') createfileStructureInput: SubTaskInput,
    // ) {
    //   return this.projectTasksService.updateSubTask(createfileStructureInput);
    // }

    @Mutation(() => SubTaskModel)
    async updatesubTask(
      @Args('subTaskDetail') createsub: SubTaskInput,
    ) {
      return this.projectTasksService.updatesubTask(createsub);
    }
  

}

