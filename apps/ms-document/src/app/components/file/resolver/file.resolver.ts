import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { FileEntity } from '../../../entities/file.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { CreateFileInput } from '../dto/create-file.input';
import { UpdateFileInput } from '../dto/update-file.input';
import { FileModel } from '../model/file.model';
import { FileService } from '../service/file.service';


@Resolver(() => FileModel)
export class FileResolver {
  constructor(
    private readonly fileService: FileService) { }

  @Query(() => [FileModel], { nullable: true })
  async File(@Args("referenceFilter") referenceFilter: ReferenceFilterParams): Promise<FileEntity[]> {
    return await this.fileService.findAllFile(referenceFilter)
  }

  @Mutation(() => FileModel)
  async createFile(
    @Args('fileDetails') createFileInput: CreateFileInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return await this.fileService.createFile(createFileInput, referenceFilter);
  }

  @Mutation(() => FileModel)
  async updateFile(
    @Args('updatefileDetails') createFileInput: UpdateFileInput
  ) {
    return await this.fileService.updateFile(createFileInput);
  }

}
