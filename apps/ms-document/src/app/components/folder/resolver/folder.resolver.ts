import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Folder } from '../../../entities/folder.entity';
import { FolderService } from '../service/folder.service';



@Resolver(of => Folder)
export class FolderResolver {
  constructor(
    @Inject(FolderService) private folderService: FolderService) { }

  // @Mutation(returns => Folder)
  // async createFolder(
  //   @Args('folderID') folderID: string,
  //   @Args('folderName') folderName: string,
  //   @Args('isFolder') isFolder: Boolean,
  // ): Promise<Folder> {
  //   return await this.folderService.create({ folderID, folderName ,isFolder})
  // }

  @Query(returns => Folder)
  async folder(@Args('id') id: number): Promise<Folder> {
    return await this.folderService.findOne(id);
  }

  @Query(returns => [Folder])
  async folders(): Promise<Folder[]> {
    return await this.folderService.findAll();
  }
}