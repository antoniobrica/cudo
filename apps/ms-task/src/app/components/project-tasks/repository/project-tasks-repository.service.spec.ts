import { Test, TestingModule } from '@nestjs/testing';
import { ProjectTasksRepositoryService } from './project-tasks-repository.service';

describe('ProjectTasksRepositoryService', () => {
  let service: ProjectTasksRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectTasksRepositoryService],
    }).compile();

    service = module.get<ProjectTasksRepositoryService>(ProjectTasksRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
