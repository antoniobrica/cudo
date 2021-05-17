import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateWorkTypeInput {
  @Field({description: 'update the name/title of the worktype'})
  name: string;
}
