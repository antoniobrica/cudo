import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksEntity } from '../../../entities/tasks.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { GetReferenceArgs } from '../../reference/dto/args/get-reference.arg.dto';
import { ReferenceService } from '../../reference/service/reference.service';
import { GetTasksArgs } from '../dto/args/get-tasks.args';
import { TaskDetailsInput } from '../dto/input/task-details.input';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksEntity)
        private projectTasksRepository: Repository<TasksEntity>,
        private referenceService: ReferenceService
    ) { }
    public async create(createProjectTaskInput: TaskDetailsInput, referenceFilter: ReferenceFilterParams): Promise<TasksEntity> {
        try {
            const taskeDetails = new TasksEntity({});
            taskeDetails.taskTitle = createProjectTaskInput.taskTitle;
            const selectedReference = await this.referenceService.getReferenceById(referenceFilter)
            const newPost = await this.projectTasksRepository.create({
                ...taskeDetails,
                reference: { id: selectedReference.id }
            });
            await this.projectTasksRepository.save(newPost);
            return newPost;
        } catch (error) {
            return error;
        }
    }

    public async findAll(refFilter: ReferenceFilterParams): Promise<TasksEntity[]> {
        const selectedReference = await this.referenceService.getReferenceById(refFilter)
        return await this.projectTasksRepository.find({
            "reference": {
                id: selectedReference.id
            }
        });
    }

}
