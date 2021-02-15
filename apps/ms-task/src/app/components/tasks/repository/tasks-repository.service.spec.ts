import { Test, TestingModule } from '@nestjs/testing';
import { TasksRepositoryService } from './tasks-repository.service';

describe('TasksRepositoryService', () => {
  let service: TasksRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksRepositoryService],
    }).compile();

    service = module.get<TasksRepositoryService>(TasksRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
