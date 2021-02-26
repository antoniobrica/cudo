import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateBuildingTypeInput {
  @Field({description:'Update the name/title of building'})
  name: string;
}
