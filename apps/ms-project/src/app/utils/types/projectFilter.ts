import { Field, InputType } from '@nestjs/graphql';

@InputType()
class ProjectFilter {

  @Field({ description: `Project ID` })
  projectId?: string;

}

export default ProjectFilter;