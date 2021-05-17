import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CostParams {
  @Field({ description: `Cost URL` })
  costURL?: string;

  @Field({ description: `Cost title` })
  costTitle?: string;

  @Field({ description: `Cost Type` })
  costType?: string;

  @Field({ description: `Cost Version` })
  costVersion?: string;

}
