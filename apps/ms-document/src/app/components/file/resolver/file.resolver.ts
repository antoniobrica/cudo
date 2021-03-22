import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { FileEntity } from '../../../entities/file.entity';
import { CreatefileInput } from '../dto/createfile.input';
import { FileService } from '../service/file.service';





@Resolver(() => FileEntity)
export class FileResolver {
  constructor(
    private readonly fileservice: FileService) { }

  @Mutation(() => FileEntity)
  async createProjectWorkType(
    @Args('ProjectworkTypeDetails') createfileinput: CreatefileInput) 
    {
    return this.fileservice.createfile(createfileinput);
  }
}
