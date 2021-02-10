import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateTaskDto } from './dto/create-Task.dto';
import { TaskEntity } from './entity/task.entity';
import { Task } from './model/task';
import { TasksService } from './task.service';

@Resolver(() => Task)
export class TasksResolver {
  constructor(
    @Inject('TaskServiceInterface')
    private readonly tasksService: TasksService) {}


  @Query(() => [TaskEntity], { nullable: true } )
   async getTasks(): Promise<TaskEntity[]>  {
     return await this.tasksService.findAll()
   }

  
  @Mutation(() => Task)
  async createNewTask(
    @Args('createTaskData') createTaskData: CreateTaskDto
  ) {
    return this.tasksService.create(createTaskData);
  }

}
