import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { CreateProjectWorkTypeInput } from '../dto/create-ProjectWorkType.input';
import { ProjectWorkTypeModel } from '../model/projecWorkTypes.model';
import { ProjectWorkTypesService } from '../service/ProjectWorkType.service';



@Resolver(() => ProjectWorkTypeModel)
export class ProjectWorkTypesResolver {
  constructor(
    private readonly projectWorkTypeService: ProjectWorkTypesService) { }

  @Mutation(() => ProjectWorkTypeModel)
  async createProjectWorkType(
    @Args('ProjectworkTypeDetails') createProjectWorkTypeInput: CreateProjectWorkTypeInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.projectWorkTypeService.createProjectWorkType(createProjectWorkTypeInput, referenceFilter);
  }
}
