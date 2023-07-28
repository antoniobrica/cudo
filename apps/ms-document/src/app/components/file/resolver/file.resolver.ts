import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { FileFilterArgs } from '../dto/args/file-filter.args';
import { FileDeleteInput } from '../dto/args/file.delete';
import { FileReferenceParams } from '../dto/args/param/file-reference.param';
import { ParentFileParams } from '../dto/args/param/parent-file.param';
import { UpdateFileInput } from '../dto/update-file.input';
import { UploadFileInfoInput } from '../dto/upload-file-info.input';
import { FileParamModel } from '../model/file-param.model';
import { FileModel } from '../model/file.model';
import { UploadedFileModel } from '../model/uploaded-file.model';
import { FileService } from '../service/file.service';


@Resolver(() => FileModel)
export class FileResolver {
  constructor(
    private readonly fileService: FileService) { }

  @Mutation(() => FileModel)
  async updateUploadedFile(
    @Args('updateUploadedfileDetails') createFileInput: UpdateFileInput
  ) {
    return await this.fileService.updateUploadedFile(createFileInput);
  }

  @Mutation(() => UploadedFileModel)
  async uploadNewFileVersion(
    @Args('uploadedFileInfo') uploadFileInfoInput: UploadFileInfoInput,
  ) {
    return await this.fileService.uploadNewFileVersion(uploadFileInfoInput);
  }

  @Query(() => UploadedFileModel, { nullable: true })
  async fileVersions(@Args('parentFile') parentFileParams: ParentFileParams) {
    return await this.fileService.fileVersions(parentFileParams)
  }

  @Mutation(() => FileParamModel)
  async addReferenceToFile(
    @Args() fileParams: FileFilterArgs,
    @Args('fileReferenceParams') fileReferenceParams: FileReferenceParams
  ) {
    return await this.fileService.addReferenceToFile(fileParams, fileReferenceParams);
  }

  @Mutation(() => UploadedFileModel)
  async saveUploadedFile(
    @Args('uploadedFileInfo') uploadFileInfoInput: UploadFileInfoInput,
    @Args("referenceFilter") referenceFilter: FileReferenceParams
  ) {
    return await this.fileService.saveUploadedFile(uploadFileInfoInput, referenceFilter);
  }

  @Query(() => [UploadedFileModel], { nullable: true })
  async uploadedFiles(@Args("referenceFilter") referenceFilter: ReferenceFilterParams) {
    
    return await this.fileService.uploadedFiles(referenceFilter)
  }

  // @Query(() => [UploadedFileModel], { nullable: true })
  // async uploadedRootFiles(@Args("referenceFilter") referenceFilter: ReferenceFilterParams) {
  //   return await this.fileService.uploadedRootFiles(referenceFilter)
  // }

  @Mutation(() => UploadedFileModel)
  async deleteFile(
      @Args('fileDeleteInput') fileDeleteInput: FileDeleteInput,
  ) {
      return this.fileService.deleteFile(fileDeleteInput);
  }

  @Mutation(() => UploadedFileModel)
  async deleteFileVersion(
      @Args('fileVersionDeleteInput') fileDeleteInput: FileDeleteInput,
  ) {
      return this.fileService.deleteFile(fileDeleteInput);
  }

  @Query(() => UploadedFileModel)
  async uploadedFileByID(@Args("fileFilter") fileFilter?: FileDeleteInput
  ) {
      const file = await this.fileService.getuploadedFileByID(fileFilter);
      return file;
  }
}
