import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { GetProjectArgs } from './dto/args/get-project.args';
import { GetProjectsArgs } from './dto/args/get-projects.args';
import { CreateProjectInput } from './dto/input/create-project.input';
import { DeleteProjectInput } from './dto/input/delete-project.input';
import { ProjectEntity } from './entity/project.entity';
import { ProjectRepositoryInterface } from './interface/project.repository.interface';
import { ProjectServiceInterface } from './interface/project.service.interface';
import { Project } from './models/project';

@Injectable()
export class ProjectsService implements ProjectServiceInterface {
  constructor(
    @Inject('ProjectRepositoryInterface')
    private readonly projectRepository: ProjectRepositoryInterface
  ) {}

  public async create(createProjectInput: CreateProjectInput): Promise<ProjectEntity> {
    const projectEntity: ProjectEntity={
        projectId: uuidv4(),
      ...createProjectInput}
      return await this.projectRepository.create(projectEntity);
}


  public  async findAll(): Promise<ProjectEntity[]> {
    
    return await this.projectRepository.findAll();
  }


  // public async deleteProject(deleteProjectData: DeleteProjectInput): Promise<ProjectEntity> {
  //   const projectIndex = this.projectRepository.findByCondition(
  //     (project) => project.projectNum === deleteProjectData.projectNum
  //   );

  //   const project =  await this.projectRepository.remove()

  //   const project = this.projectRepository[projectIndex];

  //   this.projects.splice(projectIndex);

  //   return project;
  // }



  // public async updateProject(updateProjectData: UpdateProjectInput): Promise<ProjectEntity> {
  //   const project = this.projectRepository.findByCondition(
  //     (project) => project.projectNum === updateProjectData.projectNum
  //   );
  //   await Object.assign(project, updateProjectData);

  //   return project;
  // }








  // public async deleteProject(deleteProjectData: DeleteProjectInput): Promise<ProjectEntity> {
  //   // const projectIndex = this.projectRepository.findByCondition(
  //   //   (project) => project.projectNum === deleteProjectData.projectNum
  //   // );
  //   const deleteproject = new DeleteProjectInput
  //   const project = await this.projectRepository.findOneById(DeleteProjectInput);

  //   // this.projects.splice(projectIndex);
  //   if (!project) throw new Error("Project not found!");
  //   (await project).remove()
  //   return project;
  // }


  // public async deleteProject(projectNum: number ): Promise<ProjectEntity> {
  //   try{
  //     const result: DeleteResult = await this.projectRepository.remove(projectNum);

  //     if(result.affected && result.affected>0)
  //       return new ProjectEntity()
  //   }catch(error){throw new Error("Not Found")}}



  


  private projects: Project[] = [];

  // public createProject(createProjectData: CreateProjectInput): Project {
  //   const project: Project = {
  //     projectId: uuidv4(),
  //     ...createProjectData,
  //   };

  //   this.projects.push(project);

  //   return project;
  // }

  // public updateProject(updateProjectData: UpdateProjectInput): Project {
  //   const project = this.projects.find(
  //     (project) => project.projectId === updateProjectData.projectId
  //   );

  //   Object.assign(project, updateProjectData);

  //   return project;
  // }

  public getProject(getProjectArgs: GetProjectArgs): Project {
    return this.projects.find(
      (project) => project.projectId === getProjectArgs.projectId
    );
  }

  public getProjects(getProjectsArgs: GetProjectsArgs): Project[] {
    return getProjectsArgs.projectIds.map((projectId) =>
      this.getProject({ projectId })
    );
  }


}