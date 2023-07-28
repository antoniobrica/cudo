import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateWorkTypeInput {
  @Field({description: 'update the name/title of the worktype'})
  workTypeTitle: string;

  @Field({nullable: true})
  updatedBy?: string;
}
