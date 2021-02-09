import { Inject, Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { ApolloError } from "apollo-server-express";
import { v4 as uuidv4 } from 'uuid';
import { TaskEntity } from './entity/task.entity';
import { TaskRepositoryInterface } from './interface/task.repository.interface';
import { TaskServiceInterface } from './interface/task.service.interface';
import { CreateTaskDto } from './dto/create-Task.dto';

@Injectable()
export class TasksService implements TaskServiceInterface {
  constructor(
    @Inject('TaskServiceInterface')
    private readonly taskRepository: TaskRepositoryInterface
  ) {}

  public async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {

    try{
    const taskEntity: TaskEntity={
        taskId: uuidv4(),
      ...createTaskDto}
      return await this.taskRepository.create(taskEntity);
    } catch (error){formatError: (error: GraphQLError) => {
      if (error.originalError instanceof ApolloError) {
        return error;
      }

      const errId = uuidv4();
      console.log("errId: ", errId);
      console.log(error);;
    }}
}


  public  async findAll(): Promise<TaskEntity[]> {
    try{
    return await this.taskRepository.findAll();
    } catch(error){throw error}
  }

}