import { Field, InputType } from '@nestjs/graphql';
import { CreateBkpCostBasicInput } from './create-bkp-cost-basic.input';
import { CreateBkpCostFileInput } from './create-bkp-cost-file.input';

@InputType()
export class CreateBkpCostInput {

  @Field(type => CreateBkpCostBasicInput, { description: `BKP Costs basic information` })
  bkpCostBasic: CreateBkpCostBasicInput

  @Field(type => [CreateBkpCostFileInput], { description: `Files for each BKP` })
  bkpCostFiles?: CreateBkpCostFileInput[];
}