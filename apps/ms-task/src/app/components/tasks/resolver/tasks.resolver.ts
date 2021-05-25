import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import StatusFilterParam from '../../../utils/types/status.filter';
import TaskFilterParams from '../../../utils/types/taskFilterParams';
import taskTypeFilterParam from '../../../utils/types/taskType.filter';
import SubTaskInput from '../dto/input/create-subtask.input';
import { FileFilterInput } from '../dto/input/file-delete.input ';
import {  SubTaskFilterInput } from '../dto/input/subtask-delete.input';
import { TaskDeleteInput } from '../dto/input/task-delete.input';
import { TaskDetailsUpdateInput } from '../dto/input/task-details-update.input';
import { TaskDetailsInput } from '../dto/input/task-details.input';
import { SubTaskModel } from '../models/subtask.model';
import { TaskFileModel } from '../models/taskfile.model';
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
    async tasksByStatus(@Args("referenceFilter") getTasksArgs: ReferenceFilterParams,
    @Args("statusFilter",{nullable: true}) status?:StatusFilterParam): Promise<TasksModel[]> {
        return await this.projectTasksService.findAllByStatus(getTasksArgs,status)
    }

    @Query(() => [TasksModel], { nullable: true })
    async tasksByTasktypes(@Args("referenceFilter") getTasksArgs: ReferenceFilterParams,
    @Args("taskTypeFilter",{nullable:true}) taskType?: taskTypeFilterParam): Promise<TasksModel[]> {
        return await this.projectTasksService.findAlltasksBYTaskTypes(getTasksArgs,taskType)
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
    async deleteSubTask(
        @Args('subtaskDeleteInput') taskDeleteInput: SubTaskFilterInput
    ) {
        return this.projectTasksService.deletesubTaskByID(taskDeleteInput);
    }

    @Mutation(() => [TaskFileModel])
    async removeTaskFile(
        @Args('fileDeleteInput') fileDeleteInput: FileFilterInput
    ) {
        return this.projectTasksService.deleteFileByID(fileDeleteInput);
    }


    @Mutation(() => SubTaskModel)
    async updateSubTask(
      @Args('subTaskFilter')update: SubTaskFilterInput,
      @Args('subTaskDetail') createsub: SubTaskInput,
    ) {
      return this.projectTasksService.updateSubTask(update,createsub);
    }
  

}

