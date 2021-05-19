import { Field, InputType } from '@nestjs/graphql';

@InputType()
class WorkParams {
  @Field({ description: `Work ID` })
  workTypeID?: string;

  @Field({ description: `WorkType Tilte` })
  name?: string;
}

export default WorkParams;