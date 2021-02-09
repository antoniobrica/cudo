import { CreateTaskDto } from '../dto/create-Task.dto';
import { TaskEntity } from '../entity/task.entity';

export interface TaskServiceInterface {
  create(taskDto: CreateTaskDto): Promise<TaskEntity>;
}
