import { Test, TestingModule } from '@nestjs/testing';
import { ProjectTasksResolver } from './project-tasks.resolver';

describe('ProjectTasksResolver', () => {
  let resolver: ProjectTasksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectTasksResolver],
    }).compile();

    resolver = module.get<ProjectTasksResolver>(ProjectTasksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
