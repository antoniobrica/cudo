import { Field, InputType } from '@nestjs/graphql';
import { CreateBkpCostInput } from './create-bkp-cost.input';
import { CreateCostBasicInput } from './create-cost-basic.input';

@InputType()
export class CreateBkpHierarchyInput {

  // @Field(type => CreateCostBasicInput, { description: `Costs basis informations` })
  // costBasicInfo: CreateCostBasicInput

  @Field()
  bkpMain?: string;

  @Field(type => [CreateBkpCostInput], { description: `BKP costs` })
  BKPCosts?: CreateBkpCostInput[];

}



