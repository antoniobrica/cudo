import { ProjectTasksEntity } from "../../../entities/project-tasks.entity";
import { CreateProjectTaskInput } from "../dto/input/create-project-task.input";
import { ProjectTasksModel } from "../models/project-tasks.model";

export interface IProjectTasksService {
    create(createProjectTaskInput: CreateProjectTaskInput): Promise<ProjectTasksModel>;
}
