import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateWorkTypeInput {

  @Field()
  workTypeID: string;

  @Field()
  name: string;
}

