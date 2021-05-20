import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { FileEntity } from '../../../entities/file.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { FileFilterArgs } from '../dto/args/file-filter.args';
import { FileReferenceParams } from '../dto/args/param/file-reference.param';
import { FileParams } from '../dto/args/param/file.param';
import { CreateFileInput } from '../dto/create-file.input';
import { UpdateFileInput } from '../dto/update-file.input';
import { FileParamModel } from '../model/file-param.model';
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

  @Mutation(() => FileParamModel)
  async uploadNewFileVersion(
    @Args('fileVersionDetails') fileParams: FileParams
  ) {
    return await this.fileService.uploadNewFileVersion(fileParams);
  }

  @Query(() => FileParamModel, { nullable: true })
  async allFileVersions(@Args('majorFileVersionDetails') fileParams: FileParams) {
    return await this.fileService.allFileVersion(fileParams)
  }

  @Mutation(() => FileParamModel)
  async addReferenceToFile(
    @Args() fileParams: FileFilterArgs,
    @Args('fileReferenceParams') fileReferenceParams: FileReferenceParams
  ) {
    return await this.fileService.addReferenceToFile(fileParams, fileReferenceParams);
  }

}
