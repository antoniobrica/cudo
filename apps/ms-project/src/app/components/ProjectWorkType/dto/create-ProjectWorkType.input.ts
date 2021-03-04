import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProjectWorkTypeInput {

  @Field()
  estimatedCost: number;
}

