import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCostBasicInput {

  @Field({ description: `Project structure ID` })
  structureID: string;

  @Field({ description: `Project Structure name` })
  structureName: string;

}



