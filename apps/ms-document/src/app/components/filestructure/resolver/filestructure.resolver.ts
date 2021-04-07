import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { FileStructureEntity } from '../../../entities/filestructure.entity';
import { FileStructureService } from '../service/filestructure.service';

@Resolver(of => FileStructureEntity)
export class FileStructureResolver {
  constructor(
    @Inject(FileStructureService) private filestructureService: FileStructureService) { }

    
  @Mutation(returns => FileStructureEntity)
  async createFileStructure(
    @Args('structureId') structureId: string,
    @Args('structureTitle') structureTitle: string,
  ): Promise<FileStructureEntity> {
    return await this.filestructureService.create({ structureId,structureTitle })
  }

  @Query(returns => FileStructureEntity)
  async fileStructure(@Args('id') id: number): Promise<FileStructureEntity> {
    return await this.filestructureService.findOne(id);
  }

  @Query(returns => [FileStructureEntity])
  async fileStructures(): Promise<FileStructureEntity[]> {
    return await this.filestructureService.findAll();
  }
}