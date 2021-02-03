import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GetProjectArgs } from './dto/args/get-project.args';
import { GetProjectsArgs } from './dto/args/get-projects.args';
import { CreateProjectInput } from './dto/input/create-project.input';
import { DeleteProjectInput } from './dto/input/delete-project.input';
// import { DeleteProjectInput } from './dto/input/delete-project.input';
import { UpdateProjectInput } from './dto/input/update-project.input';
import { ProjectEntity } from './entity/project.entity';
import { ProjectServiceInterface } from './interface/project.service.interface';

import { Project } from './models/project';
import { ProjectsService } from './projects.service';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(
    @Inject('ProjectServiceInterface')
    private readonly projectsService: ProjectsService) {}

  @Query(() => Project, { name: 'project', nullable: true })
  getProject(@Args() getProjectArgs: GetProjectArgs): Project {
    return this.projectsService.getProject(getProjectArgs);
  }

  // @Query(() => [Project], { name: 'projects', nullable: 'items' })
  // getProjects(@Args() getProjectsArgs: GetProjectsArgs): Project[] {
  //   return this.projectsService.getProjects(getProjectsArgs);
  // }


  @Query(() => [ProjectEntity], { nullable: true } )
   async getProjects(): Promise<ProjectEntity[]>  {
     return await this.projectsService.findAll()
   }


   

  //  @Query( ()) => [Project], { name: 'projects', nullable: 'items' })
  //  async getprojects: Promise<Project[]> {
  //    return await this.projectsService.findAll(),
  //  }


  // @Mutation(() => Project)
  // createProject(
  //   @Args('createProjectData') createProjectData: CreateProjectInput
  // ): Project {
  //   return this.projectsService.createProject(createProjectData);
  // }


  
  @Mutation(() => Project)
  async createProjectDatabase(
    @Args('createProjectData') createProjectData: CreateProjectInput
  ) {
    return this.projectsService.create(createProjectData);
  }



  // @Mutation(() => Project)
  // async deleteProject(
  //   @Args('deleteProjectData') deleteProjectData: DeleteProjectInput
  // ) {
  //   return this.projectsService.deleteProject(deleteProjectData);
  // }


  // @Mutation(() => Project)
  // updateProject(
  //   @Args('updateProjectData') updateProjectData: UpdateProjectInput
  // ) {
  //   return this.projectsService.updateProject(updateProjectData);
  // }


}
