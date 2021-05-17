import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectWorkTypeEntity } from '../../../entities/project-WorkType.entity';
import { ProjectEntity } from '../../../entities/project.entity';
import { WorkTypeEntity } from '../../../entities/work-type.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { Pagination, PaginationOptionsInterface } from '../../paginate';
import { ReferenceService } from '../../reference/service/reference.service';
import { WorkTypesService } from '../../workTypes/service/workTypes.service';
import { GetProjectArgs } from '../dto/args/get-project.args';
import { ProjectDetailsInput } from '../dto/input/project-details.input';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(ProjectEntity)
        private projectRepository: Repository<ProjectEntity>,
        @InjectRepository(ProjectWorkTypeEntity)
        private projectWorkRepository: Repository<ProjectWorkTypeEntity>,
        @InjectRepository(WorkTypeEntity)
        private workTypeRepository: Repository<WorkTypeEntity>,
        private referenceService: ReferenceService,
        private workTypeService: WorkTypesService
    ) { }
    public async create(createProjectInput: ProjectDetailsInput, referenceFilter: ReferenceFilterParams): Promise<ProjectEntity> {
        try {
            const proejctDetails = new ProjectEntity({ ...createProjectInput.projectBasics });
            proejctDetails.projectWorkTypes = [];
            const { projectWorkEstimates } = createProjectInput;
            for (let index = 0; index < projectWorkEstimates.length; index++) {
                const selectedWorkType = await this.workTypeService.getWorktypeByWorkTypeID({ workTypeID: projectWorkEstimates[index].workTypeID, name: projectWorkEstimates[index].workTypeName })
                const projectworkentity = new ProjectWorkTypeEntity({ estimatedCost: projectWorkEstimates[index].estimatedCost, workTypeName: projectWorkEstimates[index].workTypeName });
                projectworkentity.workID = selectedWorkType.workTypeID;
                const newProjectWork = await this.projectWorkRepository.create({ ...projectworkentity, workType: { id: selectedWorkType.id } });
                const savedProjectWork = await this.projectWorkRepository.save(newProjectWork);
                proejctDetails.projectWorkTypes.push(savedProjectWork);
            }
            const selectedReference = await this.referenceService.getReferenceById(referenceFilter)
            const newProject = await this.projectRepository.create({
                ...proejctDetails,
                reference: { id: selectedReference.id }
            });
            await this.projectRepository.save(newProject);
            return newProject;
        } catch (error) {
            return error;
        }
    }

    public async findAll(refFilter: ReferenceFilterParams): Promise<ProjectEntity[]> {
        const selectedReference = await this.referenceService.getReferenceById(refFilter)
        return await this.projectRepository.find({
            where: {
                "reference": {
                    id: selectedReference.id
                }
            }
            ,
            relations: ['reference', 'projectWorkTypes']
        });
    }

    public async findProjectById(refFilter: GetProjectArgs): Promise<ProjectEntity[]> {
        return await this.projectRepository.find({
            where: {
                ...refFilter
            },
            relations: ['reference', 'projectWorkTypes']
        });
    }

    async paginate(
        options: PaginationOptionsInterface,
        refFilter: ReferenceFilterParams
    ): Promise<Pagination<ProjectEntity>> {

        const selectedReference = await this.referenceService.getReferenceById(refFilter)

        
        const [results, total] = await this.projectRepository.findAndCount({ where: {
            "reference": {
                id: selectedReference.id
            }
        },
        relations:['reference', 'projectWorkTypes'],
        take: options.limit,
        skip: options.page * options.limit,
        }
        );            
        const pagination =  new Pagination({
            results,
            total,
        });      
        return pagination
    }

}
