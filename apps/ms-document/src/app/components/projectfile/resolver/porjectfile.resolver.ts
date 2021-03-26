import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateProjectfileInput } from '../dto/createprojectfile.input';
import { ProjectFileModel } from '../model/projectfile.mode';
import { ProjectFileService } from '../service/projectfile.service';



@Resolver(() => ProjectFileModel)
export class ProjectFileResolver {
  constructor(
    private readonly projectfileservice: ProjectFileService) { }

  @Mutation(() => ProjectFileModel)
  async createProjectFile(
    @Args('ProjectFileDetails') createfileinput: CreateProjectfileInput) 
    {
    return this.projectfileservice.createfile(createfileinput);
  }
}
