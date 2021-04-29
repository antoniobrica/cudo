import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubTaskEntity } from '../../../entities/subtask.entity';
import TaskAssigneessEntity from '../../../entities/task-assignees.entity';
import TaskFileEntity from '../../../entities/task-file.entity';
import TaskFllowersEntity from '../../../entities/task-followers.entity';
import { TasksEntity } from '../../../entities/tasks.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import TaskFilterParams from '../../../utils/types/taskFilterParams';
import { ReferenceService } from '../../reference/service/reference.service';
import SubTaskNotFoundException from '../dto/args/subTaskNotFound';
import SubTaskInput from '../dto/input/create-subtask.input';
import { SubTaskDeleteInput } from '../dto/input/subtask-delete.input';
import { TaskDeleteInput } from '../dto/input/task-delete.input';
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
        @InjectRepository(TaskFileEntity)
        private taskFileRepository: Repository<TaskFileEntity>,
        @InjectRepository(SubTaskEntity)
        private subTaskRepository: Repository<SubTaskEntity>,
        private referenceService: ReferenceService
    ) { }
    public async create(createProjectTaskInput: TaskDetailsInput, referenceFilter: ReferenceFilterParams): Promise<TasksEntity> {
        try {
            const { assignees, followers, files, taskBasics, subtasks } = createProjectTaskInput;
            const taskeDetails = new TasksEntity({ ...taskBasics });
            taskeDetails.assignees = [];
            taskeDetails.followers = [];
            taskeDetails.files = [];
            taskeDetails.subtasks = []
            if (assignees)
                for (let index = 0; index < assignees.length; index++) {
                    const assigneesentity = new TaskAssigneessEntity(assignees[index])
                    const newAssignee = await this.tasksAssigneeRepository.create({ ...assigneesentity });
                    const savedAssignee = await this.tasksAssigneeRepository.save(newAssignee);
                    taskeDetails.assignees.push(savedAssignee)
                }
            if (followers)
                for (let index = 0; index < followers.length; index++) {
                    const followersentity = new TaskFllowersEntity(followers[index])
                    const newFollowers = await this.tasksFollowersRepository.create({ ...followersentity });
                    const savedFollower = await this.tasksFollowersRepository.save(newFollowers);
                    taskeDetails.followers.push(savedFollower)
                }
            if (files)
                for (let index = 0; index < files.length; index++) {
                    const taskfileEntity = new TaskFileEntity(files[index])
                    const newTaskFile = await this.taskFileRepository.create({ ...taskfileEntity });
                    const savedFiles = await this.taskFileRepository.save(newTaskFile);
                    taskeDetails.files.push(savedFiles)
                }

            if (subtasks)
                for (let index = 0; index < subtasks.length; index++) {
                    const subtaskEntity = new SubTaskEntity(subtasks[index])
                    const newSubTask = await this.subTaskRepository.create({ ...subtaskEntity });
                    const savedSubTask = await this.subTaskRepository.save(newSubTask);
                    taskeDetails.subtasks.push(savedSubTask)
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
            relations: ['reference', 'assignees', 'followers', 'files','subtasks']
        });
    }

    public async findTaskById(taskFilterParams: TaskFilterParams): Promise<TasksEntity[]> {
        return await this.projectTasksRepository.find({
            where: {
                taskID: taskFilterParams.taskID
            },
            relations: ['reference', 'assignees', 'followers', 'files', 'subtasks']
        });
    }

    public async updateTaskByID(createProjectTaskInput: TaskDetailsUpdateInput): Promise<TasksEntity[]> {
        const { assignees, followers, files, taskBasics, subtasks } = createProjectTaskInput;
        const taskeDetails = await this.projectTasksRepository.find({
            where: { taskID: taskBasics.taskID },
            relations: ['reference', 'assignees', 'followers', 'files','subtasks']
        });
        if (taskeDetails.length <= 0)
            throw new HttpException('Task Not Found', HttpStatus.NOT_FOUND);
        const taskeDetail = taskeDetails[0];
        taskeDetail.assignees = [];
        taskeDetail.followers = [];
        taskeDetail.files = [];
        taskeDetail.subtasks = [];
        if (assignees)
            for (let index = 0; index < assignees.length; index++) {
                const assigneesentity = new TaskAssigneessEntity(assignees[index])
                const newAssignee = await this.tasksAssigneeRepository.create({ ...assigneesentity });
                const savedAssignee = await this.tasksAssigneeRepository.save(newAssignee);
                taskeDetail.assignees.push(savedAssignee)
            }
        if (followers)
            for (let index = 0; index < followers.length; index++) {
                const followersentity = new TaskFllowersEntity(followers[index])
                const newFollowers = await this.tasksFollowersRepository.create({ ...followersentity });
                const savedFollower = await this.tasksFollowersRepository.save(newFollowers);
                taskeDetail.followers.push(savedFollower)
            }
        if (files)
            for (let index = 0; index < files.length; index++) {
                const taskfileEntity = new TaskFileEntity(files[index])
                const newTaskFile = await this.taskFileRepository.create({ ...taskfileEntity });
                const savedFiles = await this.taskFileRepository.save(newTaskFile);
                taskeDetail.files.push(savedFiles)
            }
        if (subtasks)
            for (let index = 0; index < subtasks.length; index++) {
                const subtaskEntity = new SubTaskEntity(subtasks[index])
                const newSubTask = await this.subTaskRepository.create({ ...subtaskEntity });
                const savedSubTask = await this.subTaskRepository.save(newSubTask);
                taskeDetail.subtasks.push(savedSubTask)
            }

        taskBasics.BKPID ? taskeDetail.BKPID = taskBasics.BKPID : null;
        taskBasics.BKPTitle ? taskeDetail.BKPTitle = taskBasics.BKPTitle : null;
        taskBasics.endDate ? taskeDetail.endDate = taskBasics.endDate : null;
        taskBasics.estimatedDays ? taskeDetail.estimatedDays = taskBasics.estimatedDays : null;
        taskBasics.phaseID ? taskeDetail.phaseID = taskBasics.phaseID : null;
        taskBasics.phaseName ? taskeDetail.phaseName = taskBasics.phaseName : null;
        taskBasics.saveTaskAsTemplate ? taskeDetail.saveTaskAsTemplate = taskBasics.saveTaskAsTemplate : null;
        taskBasics.sendNotification ? taskeDetail.sendNotification = taskBasics.sendNotification : null;
        taskBasics.startDate ? taskeDetail.startDate = taskBasics.startDate : null;
        taskBasics.status ? taskeDetail.status = taskBasics.status : null;
        taskBasics.taskID ? taskeDetail.taskID = taskBasics.taskID : null;
        taskBasics.taskTitle ? taskeDetail.taskTitle = taskBasics.taskTitle : null;
        await this.projectTasksRepository.save(taskeDetail);
        const tasks = await this.projectTasksRepository.find({
            where: { taskID: taskBasics.taskID },
            relations: ['reference', 'assignees', 'followers', 'files', 'subtasks']
        });
        return tasks;
    }

    public async deleteTaskByID(taskDeleteInput: TaskDeleteInput): Promise<TasksEntity[]> {
        const { taskID } = taskDeleteInput;
        const taskeDetails = await this.projectTasksRepository.delete({ taskID: taskID });
        console.log(taskeDetails)
        const tasks = await this.projectTasksRepository.find({
            where: { taskID: taskID },
            relations: ['reference', 'assignees', 'followers', 'files', 'subtasks']
        });
        return tasks;
    }

    public async deletesubTaskByID(subtaskDeleteInput: SubTaskDeleteInput): Promise<SubTaskEntity[]> {
        const { subtaskID } = subtaskDeleteInput;
        const subtaskeDetails = await this.subTaskRepository.delete({ subtaskID: subtaskID });
        console.log(subtaskeDetails)
        const subtasks = await this.subTaskRepository.find({
            where: { subtaskID: subtaskID },
            // relations: ['reference', 'assignees', 'followers', 'files', 'subtasks']
        });
        return subtasks;
    }



    // public async updateSubTask(createFileStructureInput: SubTaskInput): Promise<SubTaskEntity> {

    //     const subTask = await this.subTaskRepository.findOne({ where: { subtaskID: createFileStructureInput.subtaskID, } });
    //     if (subTask) {
    //       await this.subTaskRepository.update(subTask.subtaskID, { ...createFileStructureInput });
    //       const updatedPost = await this.subTaskRepository.findOne(subTask.subtaskID);
    //       return updatedPost;
    //     }
    //     throw new SubTaskNotFoundException(subTask.subtaskID);
    // }

    public async updatesubTask(createsubtaskInput: SubTaskInput): Promise<SubTaskEntity> {

        const subtask = await this.subTaskRepository.findOne({ where: { subtaskID: createsubtaskInput.subtaskID } });
        if (subtask) {
          await this.subTaskRepository.update(subtask.subtaskID, { ...createsubtaskInput });
          const updatedPost = await this.subTaskRepository.findOne(subtask.subtaskID);
          return updatedPost;
        }
        throw new SubTaskNotFoundException(subtask.subtaskID);
      }

}
