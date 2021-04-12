import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { FileTypeEntity } from '../../../entities/file-type.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { CreateFileTypeInput } from '../dto/create-filetype.input';
import { FileTypeModel } from '../model/filetype.model';
import { FileTypeService } from '../service/filetype.service';



@Resolver(() => FileTypeModel)
export class FileTypeResolver {
  constructor(
    private readonly fileTypeService: FileTypeService) { }

  @Query(() => [FileTypeModel], { nullable: true })
  async FileTypes(@Args("referenceFilter") referenceFilter: ReferenceFilterParams): Promise<FileTypeEntity[]> {
    return await this.fileTypeService.findAllFileType(referenceFilter)
  }

  @Mutation(() => FileTypeModel)
  async createFileType(
    @Args('fileTypeDetails') createFileTypeInput: CreateFileTypeInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.fileTypeService.createFileType(createFileTypeInput, referenceFilter);
  }

  @Mutation(() => FileTypeModel)
  async updateFileType(
    @Args('fileTypeDetails') createFileTypeInput: CreateFileTypeInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.fileTypeService.updateFileType(createFileTypeInput, referenceFilter);
  }

}
