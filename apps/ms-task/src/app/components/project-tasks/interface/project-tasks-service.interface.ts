import { ProjectTasksEntity } from "../../../entities/project-tasks.entity";
import { CreateProjectTaskInput } from "../dto/input/create-project-task.input";

export interface IProjectTasksService {
    create(createProjectTaskInput: CreateProjectTaskInput): Promise<ProjectTasksEntity>;
}
