import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GetProjectArgs } from './dto/args/get-project.args';
import { GetProjectsArgs } from './dto/args/get-projects.args';
import { CreateProjectInput } from './dto/input/create-project.input';
import { DeleteProjectInput } from './dto/input/delete-project.input';
import { UpdateProjectInput } from './dto/input/update-project.input';
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
    const projectEntity = new ProjectEntity();
    console.log(createProjectInput);
    projectEntity.email = createProjectInput.email;
    projectEntity.age = createProjectInput.age;
    projectEntity.projectId = uuidv4();
    console.log(projectEntity);
    return this.projectRepository.create(projectEntity);  
  }
  private projects: Project[] = [];

  public createProject(createProjectData: CreateProjectInput): Project {
    const project: Project = {
      projectId: uuidv4(),
      ...createProjectData,
    };

    this.projects.push(project);

    return project;
  }

  public updateProject(updateProjectData: UpdateProjectInput): Project {
    const project = this.projects.find(
      (project) => project.projectId === updateProjectData.projectId
    );

    Object.assign(project, updateProjectData);

    return project;
  }

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

  public deleteProject(deleteProjectData: DeleteProjectInput): Project {
    const projectIndex = this.projects.findIndex(
      (project) => project.projectId === deleteProjectData.projectId
    );

    const project = this.projects[projectIndex];

    this.projects.splice(projectIndex);

    return project;
  }
}
