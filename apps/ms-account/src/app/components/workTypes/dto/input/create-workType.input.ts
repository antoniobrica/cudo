import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateWorkTypeInput {


  @Field({description:'title of the worktype'})
  workTypeTitle: string;

  @Field({nullable:true})
  createdBy?: string;

  @Field({nullable: true})
  updatedBy?: string;
}