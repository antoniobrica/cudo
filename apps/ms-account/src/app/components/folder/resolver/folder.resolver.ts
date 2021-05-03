import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { FolderEntity } from '../../../entities/folder.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { CreateFolderInput } from '../dto/create-folder.input';
import { UpdateFolder } from '../dto/update-folder.input';
import { FolderModel } from '../model/folder.model';
import { FolderService } from '../service/folder.service';




@Resolver(() => FolderModel)
export class FolderResolver {
  constructor(
    private readonly folderService: FolderService) { }

  @Query(() => [FolderModel], { nullable: true })
  async Folders(@Args("referenceFilter") referenceFilter: ReferenceFilterParams): Promise<FolderEntity[]> {
    return await this.folderService.findAllFolder(referenceFilter)
  }

  @Mutation(() => FolderModel)
  async createFolder(
    @Args('folderDetails') createFolderInput: CreateFolderInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.folderService.createFolder(createFolderInput, referenceFilter);
  }

  @Mutation(() => FolderModel)
  async updateFolder(
    @Args('folderID') update: UpdateFolder,
    @Args('folderDetails') createFolderInput: CreateFolderInput,
  ) {
    return this.folderService.updateFolder(update,createFolderInput);
  }

}
