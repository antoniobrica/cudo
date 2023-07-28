import { Field, InputType } from '@nestjs/graphql';

@InputType()
class CostFilterParams {

  @Field({ description: `Cost ID` })
  costID?: string;
}

export default CostFilterParams