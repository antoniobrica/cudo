import { TasksEntity } from "../../../entities/tasks.entity";
import { TaskDetailsInput } from "../dto/input/task-details.input";
import { TasksModel } from "../models/tasks.model";

export interface IProjectTasksService {
    create(createProjectTaskInput: TaskDetailsInput): Promise<TasksModel>;
}
