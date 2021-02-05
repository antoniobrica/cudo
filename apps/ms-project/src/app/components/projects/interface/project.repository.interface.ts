import { ProjectEntity } from '../../../entities/project.entity';
import { BaseInterfaceRepository } from '../../../repositories/base/base-interface-repository.interface';


export type ProjectRepositoryInterface = BaseInterfaceRepository<ProjectEntity>;
