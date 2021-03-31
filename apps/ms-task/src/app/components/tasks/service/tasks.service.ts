import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import TaskAssigneessEntity from '../../../entities/task-assignees.entity';
import TaskFllowersEntity from '../../../entities/task-followers.entity';
import { TasksEntity } from '../../../entities/tasks.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { GetReferenceArgs } from '../../reference/dto/args/get-reference.arg.dto';
import { ReferenceService } from '../../reference/service/reference.service';
import { GetTasksArgs } from '../dto/args/get-tasks.args';
import { TaskDetailsUpdateInput } from '../dto/input/task-details-update.input';
import { TaskDetailsInput } from '../dto/input/task-details.input';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksEntity)
        private projectTasksRepository: Repository<TasksEntity>,
        @InjectRepository(TaskAssigneessEntity)
        private tasksAssigneeRepository: Repository<TaskAssigneessEntity>,
        @InjectRepository(TaskFllowersEntity)
        private tasksFollowersRepository: Repository<TaskFllowersEntity>,
        private referenceService: ReferenceService
    ) { }
    public async create(createProjectTaskInput: TaskDetailsInput, referenceFilter: ReferenceFilterParams): Promise<TasksEntity> {
        try {
            const taskeDetails = new TasksEntity({ ...createProjectTaskInput.taskBasics });
            taskeDetails.assignees = [];
            taskeDetails.followers = [];
            const { assignees, followers } = createProjectTaskInput;
            for (let index = 0; index < assignees.length; index++) {
                const assigneesentity = new TaskAssigneessEntity(assignees[index])
                const newAssignee = await this.tasksAssigneeRepository.create({ ...assigneesentity });
                const savedAssignee = await this.tasksAssigneeRepository.save(newAssignee);
                taskeDetails.assignees.push(savedAssignee)
            }
            for (let index = 0; index < followers.length; index++) {
                const followersentity = new TaskFllowersEntity(followers[index])
                const newFollowers = await this.tasksFollowersRepository.create({ ...followersentity });
                const savedFollower = await this.tasksFollowersRepository.save(newFollowers);
                taskeDetails.followers.push(savedFollower)
            }
            const selectedReference = await this.referenceService.getReferenceById(referenceFilter)
            const newTask = await this.projectTasksRepository.create({
                ...taskeDetails,
                reference: { id: selectedReference.id }
            });
            await this.projectTasksRepository.save(newTask);
            return newTask;
        } catch (error) {
            return error;
        }
    }

    public async findAll(refFilter: ReferenceFilterParams): Promise<TasksEntity[]> {
        const selectedReference = await this.referenceService.getReferenceById(refFilter)
        return await this.projectTasksRepository.find({
            where: {
                "reference": {
                    id: selectedReference.id
                }
            }
            ,
            relations: ['reference', 'assignees', 'followers']
        });
    }
    public async update(createProjectTaskInput: TaskDetailsUpdateInput, referenceFilter: ReferenceFilterParams): Promise<TasksEntity> {
        await this.projectTasksRepository.update({ taskID: createProjectTaskInput.taskBasics.taskID }, {
            status: createProjectTaskInput.taskBasics.status
        });
        const reference = await this.projectTasksRepository.findOne({ where: { taskID: createProjectTaskInput.taskBasics.taskID } });
        return reference;
    }
}
