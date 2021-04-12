import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { FileStructureEntity } from '../../../entities/filestructure.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { CreateFileStructureInput } from '../dto/create-fileStructure.input';
import { FileStructureModel } from '../model/fileStructure.model';
import { FileStructureService } from '../service/fileStructure.service';



@Resolver(() => FileStructureModel)
export class FileStructureResolver {
  constructor(
    private readonly filestructureService: FileStructureService) { }

  @Query(() => [FileStructureModel], { nullable: true })
  async FileStructure(@Args("referenceFilter") referenceFilter: ReferenceFilterParams): Promise<FileStructureEntity[]> {
    return await this.filestructureService.findAllFileStructure(referenceFilter)
  }

  @Mutation(() => FileStructureModel)
  async createFileStructure(
    @Args('fileStructureDetails') createfileStructureInput: CreateFileStructureInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.filestructureService.createFileStructure(createfileStructureInput, referenceFilter);
  }

  @Mutation(() => FileStructureModel)
  async updateFileStructure(
    @Args('fileStructureDetails') createfileStructureInput: CreateFileStructureInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.filestructureService.updateFileStructure(createfileStructureInput, referenceFilter);
  }

}
