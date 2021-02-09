import { ProjectTasksEntity } from "../../../entities/project-tasks.entity";
import { BaseInterfaceRepository } from "../../../repositories/base/base-interface-repository.interface";

export type IProjectTasksRepository = BaseInterfaceRepository<ProjectTasksEntity>;
