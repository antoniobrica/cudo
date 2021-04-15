import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MileStoneEntity } from '../../../entities/milestone.entity';
import TaskFileEntity from '../../../entities/task-file.entity';
import { WorkTypeEntity } from '../../../entities/workType.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import { MilestoneDetailsInput } from '../dto/input/milestone-details.input';


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
}