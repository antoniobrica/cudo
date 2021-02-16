import { Test, TestingModule } from '@nestjs/testing';
import { ReferenceRepositoryService } from './reference-repository.service';

describe('ReferenceRepositoryService', () => {
  let service: ReferenceRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferenceRepositoryService],
    }).compile();

    service = module.get<ReferenceRepositoryService>(ReferenceRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
