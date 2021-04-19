import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MileStoneEntity } from '../../../entities/milestone.entity';
import TaskFileEntity from '../../../entities/task-file.entity';
import { WorkTypeEntity } from '../../../entities/workType.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import MileStoneFilterParam from '../dto/args/milestone.filter';
import { MilestoneDetailsInput } from '../dto/input/milestone-details.input';
import MileStoneNotFoundException from '../exceptions/milestoneNotFound.exception';


@Injectable()
export class MileStoneService {
    constructor(
        @InjectRepository(MileStoneEntity)
        private mileStoneRepository: Repository<MileStoneEntity>,
        @InjectRepository(WorkTypeEntity)
        private workTypeRepository: Repository<WorkTypeEntity>,
        @InjectRepository(TaskFileEntity)
        private taskFileRepository: Repository<TaskFileEntity>,
        private referenceService: ReferenceService
    ) { }
    public async create(milestoneDetailsInput: MilestoneDetailsInput, referenceFilter: ReferenceFilterParams): Promise<MileStoneEntity> {
        try {
            const milestoneDetails = new MileStoneEntity({ ...milestoneDetailsInput.milestoneBasics });
            milestoneDetails.worktypes = [];
            milestoneDetails.files = [];
            const {  files, worktypes } = milestoneDetailsInput;
            for (let index = 0; index < files.length; index++) {
                const taskfileEntity = new TaskFileEntity(files[index])
                const newTaskFile = await this.taskFileRepository.create({ ...taskfileEntity });
                const savedFiles = await this.taskFileRepository.save(newTaskFile);
                milestoneDetails.files.push(savedFiles)
            }
            for (let index = 0; index < worktypes.length; index++) {
                const worktypeEntity = new WorkTypeEntity(worktypes[index])
                const newWorkType = await this.workTypeRepository.create({ ...worktypeEntity });
                const savedworktypes = await this.workTypeRepository.save(newWorkType);
                milestoneDetails.worktypes.push(savedworktypes)
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
            relations: ['reference', 'worktypes','files' ]
        });
    }


    async getMileStoneByID(mileFilter: MileStoneFilterParam) {
        const milestone = await this.mileStoneRepository.findOne({ where: { ...mileFilter }, relations: ['worktypes','files'] });
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


}