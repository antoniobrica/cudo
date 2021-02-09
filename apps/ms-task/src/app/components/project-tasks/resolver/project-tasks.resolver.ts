import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectTasksEntity } from '../../../entities/project-tasks.entity';
import { ProjectTasksModel } from '../../../models/project-tasks.model';
import { CreateProjectTaskInput } from '../dto/input/create-project-task.input';
import { ProjectTasksService } from '../service/project-tasks.service';

@Resolver(() => ProjectTasksModel)
export class ProjectTasksResolver {
    constructor(
        @Inject('IProjectTasksService')
        private readonly projectTasksService: ProjectTasksService) { }


    @Query(() => [ProjectTasksEntity], { nullable: true })
    async getProjectTasks(): Promise<ProjectTasksEntity[]> {
        return await this.projectTasksService.findAll()
    }


    @Mutation(() => ProjectTasksModel)
    async createProjectTask(
        @Args('newTask') createProjectTaskInput: CreateProjectTaskInput
    ) {
        return this.projectTasksService.create(createProjectTaskInput);
    }

}

