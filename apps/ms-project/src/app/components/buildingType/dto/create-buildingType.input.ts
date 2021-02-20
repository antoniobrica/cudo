import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBuildingTypeInput {

  @Field({ description: `building ID for a project` })
  buildingTypeID: string;

  @Field({ description: `building name/title for the project` })
  name: string;
}

