import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectEntity } from '../../../entities/project.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { Pagination } from '../../paginate';
import { PaginationModel } from '../../paginate/pagination.model';
import { pageParams } from '../../paginate/pagination.param';
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

    @Query(() => PaginationModel, { nullable: true })
    async paginatedProject(@Args('options')options:pageParams,
    @Args("referenceFilter") getTasksArgs: ReferenceFilterParams): Promise<Pagination<ProjectEntity>>  {
        return await this.projectService.paginate(options,getTasksArgs
          )
    }


}

