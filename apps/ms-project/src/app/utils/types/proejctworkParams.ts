import { Field, InputType } from '@nestjs/graphql';

@InputType()
class ProjectWorkParams {
  @Field({ description: `User ID` })
  workTypeID?: string;

  @Field({ description: `User ID` })
  workTypeName?: string;

  @Field({ description: `User Name` })
  estimatedCost?: number;
}

export default ProjectWorkParams;