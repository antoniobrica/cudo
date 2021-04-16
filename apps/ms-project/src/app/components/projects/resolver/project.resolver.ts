import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { GetProjectArgs } from '../dto/args/get-project.args';
import { ProjectDetailsInput } from '../dto/input/project-details.input';
import { ProjectModel } from '../model/project';
import { ProjectService } from '../service/project.service';

@Resolver(() => ProjectModel)
export class ProjectResolver {

    constructor(
        private readonly projectService: ProjectService) { }

    @Query(() => [ProjectModel], { nullable: true })
    async projects(@Args("referenceFilter") getProjectArgs: ReferenceFilterParams): Promise<ProjectModel[]> {
        return await this.projectService.findAll(getProjectArgs)
    }

    @Query(() => [ProjectModel], { nullable: true })
    async projectById(@Args() getProjectArgs: GetProjectArgs): Promise<ProjectModel[]> {
        return await this.projectService.findProjectById(getProjectArgs)
    }

    @Mutation(() => ProjectModel)
    async createProject(
        @Args('projectDetails') createProjectInput: ProjectDetailsInput,
        @Args("referenceFilter") getProjectArgs: ReferenceFilterParams
    ) {
        return this.projectService.create(createProjectInput, getProjectArgs);
    }

}

