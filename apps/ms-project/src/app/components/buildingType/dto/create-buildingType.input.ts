import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBuildingTypeInput {

  @Field()
  buildingTypeID: string;

  @Field()
  name: string;
}

