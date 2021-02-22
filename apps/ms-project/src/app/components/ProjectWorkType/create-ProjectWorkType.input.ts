import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProjectWorkTypeInput {

  @Field()
  projectWorkTypeID: string;

  @Field()
  estimatedCost: number;
}

