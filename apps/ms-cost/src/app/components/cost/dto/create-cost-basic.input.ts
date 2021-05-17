import { Field, InputType } from '@nestjs/graphql';
import { CreateBkpCostInput } from './create-bkp-cost.input';

@InputType()
export class CreateCostBasicInput {

  @Field({ description: `Project structure ID` })
  structureID: string;

  @Field({ description: `Project Structure name` })
  structureName: string;

}



