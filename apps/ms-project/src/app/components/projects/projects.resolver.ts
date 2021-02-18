import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateProjectInput } from './dto/input/create-project.input';

import { Project } from './models/project';
import { ProjectsService } from './projects.service';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(
    @Inject('ProjectServiceInterface')
    private readonly projectsService: ProjectsService) { }


  @Query(() => [Project], { nullable: true })
  async getProjects(): Promise<Project[]> {
    return await this.projectsService.findAll()
  }

  @Mutation(() => Project)
  async createNewProject(
    @Args('newProjectInputObject') newProjectInputObject: CreateProjectInput
  ) {
    return this.projectsService.create(newProjectInputObject);
  }

}
