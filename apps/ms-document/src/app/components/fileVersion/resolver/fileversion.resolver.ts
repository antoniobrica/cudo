import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { FileEntity } from '../../../entities/file.entity';
import { FileVersionEntity } from '../../../entities/fileversion.entity';
import { CreateFileVersionInput } from '../dto/create-fileversion.input';
import { FileVersionModel } from '../model/fileversion.model';
import { FileVersionService } from '../service/fileversion.service';


@Resolver(() => FileVersionModel)
export class FileVersionResolver {
  constructor(
    private readonly fileversionService: FileVersionService) { }



  @Mutation(() => FileVersionModel)
  async createFileVersion(
    @Args('fileDetails') createFileVersionInput: CreateFileVersionInput,
  ) {
    return this.fileversionService.createFile(createFileVersionInput);
  }

  @Query(returns => FileVersionModel)
  async fileuser(@Args('id') id: number): Promise<FileVersionEntity> {
    return await this.fileversionService.findOne(id);
  }



}
