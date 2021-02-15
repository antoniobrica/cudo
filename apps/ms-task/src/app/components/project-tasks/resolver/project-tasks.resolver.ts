import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProjectTaskInput } from '../dto/input/create-project-task.input';
import { ProjectTasksModel } from '../models/project-tasks.model';
import { ProjectTasksService } from '../service/project-tasks.service';

@Resolver(() => ProjectTasksModel)
export class ProjectTasksResolver {

    constructor(
        @Inject('IProjectTasksService')
        private readonly projectTasksService: ProjectTasksService) { }

    @Query(() => [ProjectTasksModel], { nullable: true })
    async getProjectTasks(): Promise<ProjectTasksModel[]> {
        return await this.projectTasksService.findAll()
    }

    @Mutation(() => ProjectTasksModel)
    async createProjectTask(
        @Args('taskDetail') createProjectTaskInput: CreateProjectTaskInput
    ) {
        return this.projectTasksService.create(createProjectTaskInput);
    }

}

