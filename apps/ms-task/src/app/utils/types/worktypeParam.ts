import { Field, InputType } from '@nestjs/graphql';

@InputType()
class WorkTypeParams {
  @Field({ description: `User ID` })
  workTypeID?: string;

  @Field({ description: `User Name` })
  workTypeTitle?: string;

}

export default WorkTypeParams;