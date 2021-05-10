import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MileStoneEntity } from '../../../entities/milestone.entity';
import TaskFileEntity from '../../../entities/task-file.entity';
import { WorkTypeEntity } from '../../../entities/workType.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { Pagination, PaginationOptionsInterface } from '../../paginate';
import { ReferenceService } from '../../reference/service/reference.service';
import MileStoneFilterParam from '../dto/args/milestone.filter';
import { MilestoneDetailsInput } from '../dto/input/milestone-details.input';
import { MileStoneDetailsUpdateInput } from '../dto/input/milestone-update.input';
import MileStoneNotFoundException from '../exceptions/milestoneNotFound.exception';


@Injectable()
export class MileStoneService {
    constructor(
        @InjectRepository(MileStoneEntity)
        private mileStoneRepository: Repository<MileStoneEntity>,
        @InjectRepository(TaskFileEntity)
        private taskFileRepository: Repository<TaskFileEntity>,
        private referenceService: ReferenceService
    ) { }
    public async create(milestoneDetailsInput: MilestoneDetailsInput, referenceFilter: ReferenceFilterParams): Promise<MileStoneEntity> {
        try {
            const milestoneDetails = new MileStoneEntity({ ...milestoneDetailsInput.milestoneBasics });
            milestoneDetails.files = [];
            const {  files } = milestoneDetailsInput;
            for (let index = 0; index < files.length; index++) {
                const taskfileEntity = new TaskFileEntity(files[index])
                const newTaskFile = await this.taskFileRepository.create({ ...taskfileEntity });
                const savedFiles = await this.taskFileRepository.save(newTaskFile);
                milestoneDetails.files.push(savedFiles)
            }
            const selectedReference = await this.referenceService.getReferenceById(referenceFilter)
            const newMilestone = await this.mileStoneRepository.create({
                ...milestoneDetails,
                reference: { id: selectedReference.id }
            });
            await this.mileStoneRepository.save(newMilestone);
            return newMilestone;
        } catch (error) {
            return error;
        }
    }


    public async findAll(refFilter: ReferenceFilterParams): Promise<MileStoneEntity[]> {
        const selectedReference = await this.referenceService.getReferenceById(refFilter)
        return await this.mileStoneRepository.find({
            where: {
                "reference": {
                    id: selectedReference.id
                }
            }
            ,
            relations: ['reference', 'files' ]
        });
    }


    async getMileStoneByID(mileFilter: MileStoneFilterParam) {
        const milestone = await this.mileStoneRepository.findOne({ where: { ...mileFilter }, relations: ['files'] });
        if (milestone) {
            return milestone;
        }
        throw new MileStoneNotFoundException(milestone.milestoneID);
    }

    async deleteMileStone(mileFilter: MileStoneFilterParam) {
        const { id } = await this.mileStoneRepository.findOne({ where: { ...mileFilter } });
        const deleteResponse = await this.mileStoneRepository.delete(id);
        if (deleteResponse) {
            return deleteResponse;
        }
        throw new MileStoneNotFoundException(mileFilter.milestoneID);
    }

    public async updateMileStoneByID(createMileStoneInput: MileStoneDetailsUpdateInput): Promise<MileStoneEntity[]> {
        const { files, milestoneBasics } = createMileStoneInput;
        const milestoneDetails = await this.mileStoneRepository.find({
            where: { milestoneID: milestoneBasics.milestoneID },
            relations: ['reference', 'files']
        });
        if (milestoneDetails.length <= 0)
            throw new HttpException('MileStone Not Found', HttpStatus.NOT_FOUND);
        const milestoneDetail = milestoneDetails[0];
        milestoneDetail.files = [];
       
        if (files)
            for (let index = 0; index < files.length; index++) {
                const taskfileEntity = new TaskFileEntity(files[index])
                const newTaskFile = await this.taskFileRepository.create({ ...taskfileEntity });
                const savedFiles = await this.taskFileRepository.save(newTaskFile);
                milestoneDetail.files.push(savedFiles)
            }
     
        milestoneBasics.milestoneTitle? milestoneDetail.milestoneTitle = milestoneBasics.milestoneTitle : null;
        milestoneBasics.dueDate? milestoneDetail.dueDate = milestoneBasics.dueDate : null;
        milestoneBasics.description? milestoneDetail.description = milestoneBasics.description : null;
        milestoneBasics.phaseID? milestoneDetail.phaseID = milestoneBasics.phaseID : null;
        milestoneBasics.phaseName? milestoneDetail.phaseName = milestoneBasics.phaseName : null;
        milestoneBasics.worktypeID? milestoneDetail.worktypeID = milestoneBasics.worktypeID : null;
        milestoneBasics.worktypeName? milestoneDetail.worktypeName = milestoneBasics.worktypeName : null;
        milestoneBasics.status? milestoneDetail.status = milestoneBasics.status : null;

        await this.mileStoneRepository.save(milestoneDetail);
        const milestones = await this.mileStoneRepository.find({
            where: { milestoneID: milestoneBasics.milestoneID },
            relations: ['reference', 'files' ]
        });
        return milestones;
    }

        async paginate(
            options: PaginationOptionsInterface,
            refFilter: ReferenceFilterParams
        ): Promise<Pagination<MileStoneEntity>> {

            const selectedReference = await this.referenceService.getReferenceById(refFilter)

            
            const [results, total] = await this.mileStoneRepository.findAndCount({ where: {
                "reference": {
                    id: selectedReference.id
                }
            },
            relations:['reference','files'],
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
