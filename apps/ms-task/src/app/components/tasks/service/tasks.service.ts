import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubTaskEntity } from '../../../entities/subtask.entity';
import TaskAssigneessEntity from '../../../entities/task-assignees.entity';
import TaskFileEntity from '../../../entities/task-file.entity';
import TaskFllowersEntity from '../../../entities/task-followers.entity';
import { TasksEntity } from '../../../entities/tasks.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import SortFilterParam from '../../../utils/types/sortParam';
import StatusFilterParam from '../../../utils/types/status.filter';
import TaskFilterParams from '../../../utils/types/taskFilterParams';
import taskTypeFilterParam from '../../../utils/types/taskType.filter';
import { Pagination, PaginationOptionsInterface } from '../../paginate';
import { ReferenceService } from '../../reference/service/reference.service';
import SubTaskNotFoundException from '../dto/args/subTaskNotFound';
import SubTaskInput from '../dto/input/create-subtask.input';
import { FileFilterInput } from '../dto/input/file-delete.input ';
import { SubTaskFilterInput } from '../dto/input/subtask-delete.input';
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
                    const newSubTask = await this.subTaskRepository.create({ ...subtaskEntity,taskID:  taskeDetails.taskID});
                    const savedSubTask = await this.subTaskRepository.save(newSubTask);
                    taskeDetails.subtasks.push(savedSubTask)
                }    

            const selectedReference = await this.referenceService.getReferenceById(referenceFilter)
                const seq = await this.projectTasksRepository.find({where:{"reference": {
                    id: selectedReference.id
                }
            },order: {sequenceNumber:"DESC"}, take:1,
        })
        if (!seq) {
            taskeDetails.sequenceNumber = 0            
        }
        var result = seq.reduce((acc, shot) => acc = acc > shot.sequenceNumber ? acc : shot.sequenceNumber, 0);


        function increment(){
            result++;
            return result
          }
          increment()
        taskeDetails.sequenceNumber = result;    

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

     async findAllByStatus(
         refFilter: ReferenceFilterParams, 
         options?: PaginationOptionsInterface,
         statusFilter?: StatusFilterParam, 
         sortFilter?: SortFilterParam): Promise<Pagination<TasksEntity>> {

        const selectedReference = await this.referenceService.getReferenceById(refFilter)

        if(options){
            if(options && statusFilter){
                const [results, total] = await this.projectTasksRepository.findAndCount({ where: {
                    isDeleted:false,
                    status:statusFilter.status,
                    "reference": {
                        id: selectedReference.id
                    }
                },
                relations: ['reference','assignees', 'followers', 'files','subtasks'],
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
            if(options && statusFilter && sortFilter){
                    if(sortFilter.sortBy=="DESC"){
                    const [results, total] = await this.projectTasksRepository.findAndCount({ where: {
                        isDeleted:false,
                        status:statusFilter.status,
                        "reference": {
                            id: selectedReference.id
                        }
                    },
                    relations: ['reference','assignees', 'followers', 'files','subtasks'],
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
        }
        if(statusFilter){
            const [results, total] = await this.projectTasksRepository.findAndCount({ where: {
                isDeleted:false,
                status:statusFilter.status,
                "reference": {
                    id: selectedReference.id
                }
            },
            relations: ['reference','assignees', 'followers', 'files','subtasks'],
            }
            );            
            const pagination =  new Pagination({
                results,
                total,
            });      
            return pagination
        }
        if(sortFilter){
            if(sortFilter.sortBy=="DESC"){
                const [results, total] = await this.projectTasksRepository.findAndCount({ where: {
                    isDeleted:false,
                    "reference": {
                        id: selectedReference.id
                    },order:{createdAt:"DESC"}
                },
                relations: ['reference','assignees', 'followers', 'files','subtasks'],
                }
                );            
                const pagination =  new Pagination({
                    results,
                    total,
                });
                return pagination
            }
        }
        else{ 
                     const [results, total] = await this.projectTasksRepository.findAndCount({ where: {
                    isDeleted:false,
                    "reference": {
                        id: selectedReference.id
                    }
                },
                relations: ['reference','assignees', 'followers', 'files','subtasks'],
                }
                );            
                const pagination =  new Pagination({
                    results,
                    total,
                });      
                return pagination
        
           }
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
        
        if (assignees){   
            if(taskeDetail.assignees.length > 0){
                const taskPreviousAssigneeIDs = taskeDetail.assignees.map((item) => item.id)                    
                await this.tasksAssigneeRepository.delete(taskPreviousAssigneeIDs);   
            }

            for (let index = 0; index < assignees.length; index++) {
                                    
                // for (let delIndex = 0; delIndex < taskeDetail.assignees.length; delIndex++) {
                //     console.log('----taskeDetail.assignees--delIndex---------', taskeDetail.assignees[delIndex])
                //     const deleteAssigneesentity = new TaskAssigneessEntity(assignees[delIndex])
                //     await this.tasksAssigneeRepository.delete(taskeDetail.assignees[delIndex].id);
                // }
                
                // const alreadyAssignedUserIDs = taskeDetail.assignees.map(({userID}) => userID)
                // if(!alreadyAssignedUserIDs.includes(assignees[index].userID)){
                //     const assigneesentity = new TaskAssigneessEntity(assignees[index])
                //     const newAssignee = await this.tasksAssigneeRepository.create({ ...assigneesentity });
                //     const savedAssignee = await this.tasksAssigneeRepository.save(newAssignee);
                //     taskeDetail.assignees.push(savedAssignee)
                // }
                
                const assigneesentity = new TaskAssigneessEntity(assignees[index])
                const newAssignee = await this.tasksAssigneeRepository.create({ ...assigneesentity });
                const savedAssignee = await this.tasksAssigneeRepository.save(newAssignee);
                // taskeDetail.assignees.push(savedAssignee)
                if(index===0){
                    taskeDetail.assignees=[savedAssignee]
                } else{
                    taskeDetail.assignees.push(savedAssignee) 
                }                
            }
        }    
        if (followers)
            if(taskeDetail.followers.length > 0){
                const taskPreviousFollowersIDs = taskeDetail.followers.map((item) => item.id)                    
                await this.tasksFollowersRepository.delete(taskPreviousFollowersIDs);   
            }
            for (let index = 0; index < followers.length; index++) {
                const followersentity = new TaskFllowersEntity(followers[index])
                const newFollowers = await this.tasksFollowersRepository.create({ ...followersentity });
                const savedFollower = await this.tasksFollowersRepository.save(newFollowers);
                // taskeDetail.followers.push(savedFollower)
                if(index===0){
                    taskeDetail.followers=[savedFollower]
                } else{
                    taskeDetail.followers.push(savedFollower) 
                }  
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
                const newSubTask = await this.subTaskRepository.create({ ...subtaskEntity,taskID: taskBasics.taskID});
                const savedSubTask = await this.subTaskRepository.save(newSubTask);
                taskeDetail.subtasks.push(savedSubTask)
            }

        if(taskBasics.status ? taskeDetail.status = taskBasics.status : null){
            const subtask = await this.subTaskRepository.find({ where: { taskID: taskBasics.taskID  } });
            const ids = subtask.map(t => t.Id)
            await this.subTaskRepository.update( ids,{status:taskeDetail.status});
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
        taskBasics.taskID ? taskeDetail.taskID = taskBasics.taskID : null;
        taskBasics.taskTitle ? taskeDetail.taskTitle = taskBasics.taskTitle : null;
        taskBasics.description ? taskeDetail.description = taskBasics.description : null;
        taskBasics.fileID ? taskeDetail.fileID = taskBasics.fileID : null;
        taskBasics.fileName ? taskeDetail.fileName = taskBasics.fileName : null;
        taskBasics.taskTypeID ? taskeDetail.taskTypeID = taskBasics.taskTypeID : null;
        taskBasics.taskType ? taskeDetail.taskType = taskBasics.taskType : null;
        taskBasics.taskTypeName ? taskeDetail.taskTypeName = taskBasics.taskTypeName : null;
        taskBasics.workTypeID ? taskeDetail.workTypeID = taskBasics.workTypeID : null;
        taskBasics.workTypeName ? taskeDetail.workTypeName = taskBasics.workTypeName : null;
        taskBasics.workTypeName ? taskeDetail.workTypeName = taskBasics.workTypeName : null;
        taskBasics.projectWorktype ? taskeDetail.projectWorktype = taskBasics.projectWorktype : null;
        taskBasics.projectWorktypeID ? taskeDetail.projectWorktypeID = taskBasics.projectWorktypeID : null;
        taskBasics.projectWorktypeName ? taskeDetail.projectWorktypeName = taskBasics.projectWorktypeName : null;
console.log('----update task for status-------', taskBasics)
        await this.projectTasksRepository.save(taskeDetail);
        const tasks = await this.projectTasksRepository.find({
            where: { taskID: taskBasics.taskID },
            relations: ['reference', 'assignees', 'followers', 'files', 'subtasks']
        });
        return tasks;
    }


      public async updateSubTask(updateSubTask: SubTaskFilterInput, createinput: SubTaskInput): Promise<SubTaskEntity> {
        const subtask = await this.subTaskRepository.findOne({ where: { subtaskID: updateSubTask.subtaskID } });
        if (subtask) {
          await this.subTaskRepository.update(subtask.Id, { ...createinput });
          const updatedPost = await this.subTaskRepository.findOne(subtask.Id);

            // #region Check all subtask status are completed then task also be completed
            if(subtask.status === 'COMPLETED'){
                const subtasks = await this.subTaskRepository.find({ where: { taskID: subtask.taskID, isDeleted:false}})  
                
                let completedSubTaskCount = 1
                for (let index = 0; index < subtasks.length; index++) {
                    if(subtasks[index].status==='COMPLETED'){
                        completedSubTaskCount = completedSubTaskCount + 1
                    }
                }
                
                if(subtasks.length===completedSubTaskCount){
                    const taskeDetail = await this.projectTasksRepository.findOne({ where: { taskID:subtask.taskID } })
                    await this.projectTasksRepository.update( taskeDetail.id, {status:'COMPLETED'});
                }            
            } 
            // #endregion

          return updatedPost;
        }
        throw new SubTaskNotFoundException(subtask.subtaskID);
      }

    public async deletesubTaskByID(subtaskDeleteInput: SubTaskFilterInput): Promise<SubTaskEntity> {
        const subtask = await this.subTaskRepository.findOne({ where:{subtaskID:subtaskDeleteInput.subtaskID} });
        if (subtask) {
            subtask.isDeleted=!(subtask.isDeleted)
            const updatedPost = await subtask.save()            
            return updatedPost
          }
          throw new HttpException('Task Not Found', HttpStatus.NOT_FOUND);
        }
       


    public async findAlltasksBYTaskTypes(refFilter: ReferenceFilterParams, taskTypeFilter: taskTypeFilterParam): Promise<TasksEntity[]> {
        const selectedReference = await this.referenceService.getReferenceById(refFilter)
        const query: any = {
            where: {"isDeleted":false,
             taskType: taskTypeFilter.taskType,
             reference: {
               id: selectedReference.id,
              },
            },
            relations: ['reference','assignees', 'followers', 'files','subtasks'],
          };
          if (taskTypeFilter.fileID) query.where.fileID = taskTypeFilter.fileID;
          if (taskTypeFilter.taskTypeID) query.where.taskTypeID = taskTypeFilter.taskTypeID;
          const result = await this.projectTasksRepository.find(query);
          return result;
    }

    public async deleteFileByID(fileDeleteInput: FileFilterInput): Promise<TaskFileEntity[]> {
        const { taskFileID } = fileDeleteInput;
        const fileDetails = await this.taskFileRepository.delete({ taskFileID: taskFileID });
        const files = await this.taskFileRepository.find({
            where: { taskFileID: taskFileID },
        });
            return files; 
    }

    public async deleteTask(taskDeleteInput: TaskDeleteInput): Promise<TasksEntity> {
        const task = await this.projectTasksRepository.findOne({ where:{taskID:taskDeleteInput.taskID} });
        if (task) {
            task.isDeleted=!(task.isDeleted)
            const updatedPost = await task.save()
            return updatedPost
          }
          throw new HttpException('Task Not Found', HttpStatus.NOT_FOUND);
        }

}
