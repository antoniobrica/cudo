import { TasksEntity } from "../../../entities/tasks.entity";
import { BaseInterfaceRepository } from "../../../repositories/base/base-interface-repository.interface";

export type ITasksRepository = BaseInterfaceRepository<TasksEntity>;
