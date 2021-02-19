import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateBuildingTypeInput {
  @Field()
  name: string;
}
