import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateWorkTypeInput {

  @Field({description:'Work type ID for reference'})
  workTypeID: string;

  @Field({description:'title of the worktype'})
  name: string;
}

