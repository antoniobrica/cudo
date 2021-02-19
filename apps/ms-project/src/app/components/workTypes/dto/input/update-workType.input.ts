import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateWorkTypeInput {
  @Field()
  name: string;
}
