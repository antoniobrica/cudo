import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MileStoneEntity } from '../../../entities/milestone.entity';
import TaskFileEntity from '../../../entities/task-file.entity';
import { TaskErrorTypeEnum } from '../../../enums/task-error-type.enum';
import TaskCustomError from '../../../exceptions/taskCustomError.execption';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { Pagination, PaginationOptionsInterface } from '../../paginate';
import { ReferenceService } from '../../reference/service/reference.service';
import MileStoneFilterParam from '../dto/args/milestone.filter';
import MileStonesFilterParam from '../dto/args/milestones.filter';
import { MilestoneDetailsInput } from '../dto/input/milestone-details.input';
import { MileStoneDetailsUpdateInput } from '../dto/input/milestone-update.input';

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
            // handling client input errors
            let errorType: number;

            if (!milestoneDetailsInput.milestoneBasics.dueDate) {
                errorType = TaskErrorTypeEnum.NO_DUE_DATE
            }
            if (!milestoneDetailsInput.milestoneBasics.phaseID) {
                errorType = TaskErrorTypeEnum.NO_PHASE
            }
            if (!milestoneDetailsInput.milestoneBasics.worktypeID) {
                errorType = TaskErrorTypeEnum.NO_PLANNING_WORKTYPE
            }
            if (!milestoneDetailsInput.milestoneBasics.milestoneTitle) {
                errorType = TaskErrorTypeEnum.NO_PLANNING_TITLE
            }

            if (errorType) {
                throw new TaskCustomError(errorType)
            }

            const milestoneDetails = new MileStoneEntity({ ...milestoneDetailsInput.milestoneBasics });
            milestoneDetails.files = [];
            const { files } = milestoneDetailsInput;
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


    // public async findAll(refFilter: ReferenceFilterParams): Promise<MileStoneEntity[]> {
    //     const selectedReference = await this.referenceService.getReferenceById(refFilter)
    //     return await this.mileStoneRepository.find({
    //         where: {
    //             "reference": {
    //                 id: selectedReference.id
    //             }
    //         }
    //         ,
    //         relations: ['reference', 'files' ]
    //     });
    // }


    public async findAll(refFilter: ReferenceFilterParams, filterOptions:MileStonesFilterParam): Promise<MileStoneEntity[]> {
        const selectedReference = await this.referenceService.getReferenceById(refFilter)
        const {phaseID,worktypeID} = filterOptions
        return await this.mileStoneRepository.find({
            where: {
                worktypeID,
                phaseID,
                "reference": {
                    id: selectedReference.id
                }
            }
            ,
            relations: ['reference', 'files']
        });
    }


    async getMileStoneByID(mileFilter: MileStoneFilterParam) {
        const milestone = await this.mileStoneRepository.findOne({ where: { ...mileFilter }, relations: ['files'] });
        if (milestone) {
            return milestone;
        }
        throw new TaskCustomError(TaskErrorTypeEnum.PLANNING_NOT_EXITST);
    }

    async deleteMileStone(mileFilter: MileStoneFilterParam) {
        const { id } = await this.mileStoneRepository.findOne({ where: { ...mileFilter } });
        const deleteResponse = await this.mileStoneRepository.delete(id);
        if (deleteResponse) {
            return deleteResponse;
        }
        throw new TaskCustomError(TaskErrorTypeEnum.PLANNING_NOT_EXITST);
    }

    public async updateMileStoneByID(createMileStoneInput: MileStoneDetailsUpdateInput): Promise<MileStoneEntity[]> {
        const { files, milestoneBasics } = createMileStoneInput;
        const milestoneDetails = await this.mileStoneRepository.find({
            where: { milestoneID: milestoneBasics.milestoneID },
            relations: ['reference', 'files']
        });
        if (milestoneDetails.length <= 0)
            throw new TaskCustomError(TaskErrorTypeEnum.PLANNING_NOT_EXITST);

        // handling client input errors
        let errorType: number;

        if (!createMileStoneInput.milestoneBasics.dueDate) {
            errorType = TaskErrorTypeEnum.NO_DUE_DATE
        }
        // if(!createMileStoneInput.milestoneBasics.phaseID){
        //     errorType = TaskErrorTypeEnum.NO_PHASE
        // }
        if (!createMileStoneInput.milestoneBasics.worktypeID) {
            errorType = TaskErrorTypeEnum.NO_PLANNING_WORKTYPE
        }
        if (!createMileStoneInput.milestoneBasics.milestoneTitle) {
            errorType = TaskErrorTypeEnum.NO_PLANNING_TITLE
        }
        if (errorType) {
            throw new TaskCustomError(errorType)
        }

        const milestoneDetail = milestoneDetails[0];
        milestoneDetail.files = [];

        if (files)
            for (let index = 0; index < files.length; index++) {
                const taskfileEntity = new TaskFileEntity(files[index])
                const newTaskFile = await this.taskFileRepository.create({ ...taskfileEntity });
                const savedFiles = await this.taskFileRepository.save(newTaskFile);
                milestoneDetail.files.push(savedFiles)
            }

        milestoneBasics.milestoneTitle ? milestoneDetail.milestoneTitle = milestoneBasics.milestoneTitle : null;
        milestoneBasics.dueDate ? milestoneDetail.dueDate = milestoneBasics.dueDate : null;
        milestoneBasics.description ? milestoneDetail.description = milestoneBasics.description : null;
        milestoneBasics.phaseID ? milestoneDetail.phaseID = milestoneBasics.phaseID : null;
        milestoneBasics.phaseName ? milestoneDetail.phaseName = milestoneBasics.phaseName : null;
        milestoneBasics.worktypeID ? milestoneDetail.worktypeID = milestoneBasics.worktypeID : null;
        milestoneBasics.worktypeName ? milestoneDetail.worktypeName = milestoneBasics.worktypeName : null;
        milestoneBasics.status ? milestoneDetail.status = milestoneBasics.status : null;

        await this.mileStoneRepository.save(milestoneDetail);
        const milestones = await this.mileStoneRepository.find({
            where: { milestoneID: milestoneBasics.milestoneID },
            relations: ['reference', 'files']
        });
        return milestones;
    }

    async paginate(
        options: PaginationOptionsInterface,
        refFilter: ReferenceFilterParams
    ): Promise<Pagination<MileStoneEntity>> {

        const selectedReference = await this.referenceService.getReferenceById(refFilter)


        const [results, total] = await this.mileStoneRepository.findAndCount({
            where: {
                "reference": {
                    id: selectedReference.id
                }
            },
            relations: ['reference', 'files'],
            take: options.limit,
            skip: options.page * options.limit,
        }
        );
        const pagination = new Pagination({
            results,
            total,
        });
        return pagination
    }

}
