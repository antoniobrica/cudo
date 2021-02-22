import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import ReferenceFilterParams from '../../utils/types/referenceFilterParams';
import { CreateProjectWorkTypeInput } from './create-ProjectWorkType.input';
import { ProjectWorkTypeEntity } from './project-WorkType.entity';
import { ProjectWorkTypesService } from './ProjectWorkType.service';
import { ProjectWorkTypeModel } from './projecWorkTypes.model';


@Resolver(() => ProjectWorkTypeModel)
export class ProjectWorkTypesResolver {
  constructor(
    private readonly projectWorkTypeService: ProjectWorkTypesService) { }

  @Query(() => [ProjectWorkTypeModel], { nullable: true })
  async ProjectworkTypes(@Args("referenceFilter") referenceFilter: ReferenceFilterParams): Promise<ProjectWorkTypeEntity[]> {
    return await this.projectWorkTypeService.findAllWorkType(referenceFilter)
  }

  @Mutation(() => ProjectWorkTypeModel)
  async createProjectWorkType(
    @Args('ProjectworkTypeDetails') createProjectWorkTypeInput: CreateProjectWorkTypeInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.projectWorkTypeService.createProjectWorkType(createProjectWorkTypeInput, referenceFilter);
  }

  @Mutation(() => ProjectWorkTypeModel)
  async updateProjectWorkType(
    @Args('ProjectworkTypeDetails') createProjectWorkTypeInput: CreateProjectWorkTypeInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.projectWorkTypeService.updateWorkType(createProjectWorkTypeInput, referenceFilter);
  }

}
