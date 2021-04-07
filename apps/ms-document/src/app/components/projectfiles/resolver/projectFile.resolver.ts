import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProjectFileEntity } from '../../../entities/projectfile.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { CreateProjectfileInput } from '../dto/create-proejctfile.input';
import { ProjectFileModel } from '../model/ProjectFile.model';
import { ProjectFileService } from '../service/proejctfile.service';



@Resolver(() => ProjectFileModel)
export class ProjectFileResolver {
  constructor(
    private readonly proejctfileService: ProjectFileService) { }

  @Query(() => [ProjectFileModel], { nullable: true })
  async ProjectFile(@Args("referenceFilter") referenceFilter: ReferenceFilterParams): Promise<ProjectFileEntity[]> {
    return await this.proejctfileService.findAllProjectFile(referenceFilter)
  }

  @Mutation(() => ProjectFileModel)
  async createProjectFile(
    @Args('proejctfileDetails') createProejctFileInput: CreateProjectfileInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.proejctfileService.createProjectFile(createProejctFileInput, referenceFilter);
  }

  @Mutation(() => ProjectFileModel)
  async updateProjectFile(
    @Args('proejctfileDetails') createProejctFileInput: CreateProjectfileInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.proejctfileService.updateProjectFile(createProejctFileInput, referenceFilter);
  }

}
