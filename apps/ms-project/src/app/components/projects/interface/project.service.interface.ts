import { CreateProjectInput } from '../dto/input/create-project.input';
import { ProjectEntity } from '../entity/project.entity';

export interface ProjectServiceInterface {
  create(createProjectInput: CreateProjectInput): Promise<ProjectEntity>;

  //findAll(): Promise<ProjectEntity[]>
  
  // deleteProject(id: number): Promise<ProjectEntity>
}
