import { ProjectEntity } from '../../../entities/project.entity';
import { CreateProjectInput } from '../dto/input/create-project.input';

export interface ProjectServiceInterface {
  create(createProjectInput: CreateProjectInput): Promise<ProjectEntity>;
}
