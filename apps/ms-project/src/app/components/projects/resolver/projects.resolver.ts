import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProjectEntity } from '../../../entities/project.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { CreateProjectInput } from '../dto/input/create-project.input';
import { Project } from '../model/project';
import { ProjectsService } from '../service/projects.service';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(
    private readonly projectsService: ProjectsService) { }

  @Query(() => [Project], { nullable: true })
  async projects(@Args("referenceFilter") referenceFilter: ReferenceFilterParams): Promise<ProjectEntity[]> {
    return await this.projectsService.findAll(referenceFilter)
  }

  @Mutation(() => Project)
  async createProject(
    @Args('projectDetails') createProjectTaskInput: CreateProjectInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.projectsService.create(createProjectTaskInput, referenceFilter);
  }

}
