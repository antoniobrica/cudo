import { Field, InputType } from '@nestjs/graphql';
import { CreateBKPchildren } from './args/bkp.children.param';
import { CreateBkpCostInput } from './create-bkp-cost.input';
import { CreateCostBasicInput } from './create-cost-basic.input';

@InputType()
export class CreateBkpHierarchyInput {

  @Field()
  bkpID?: string;

  @Field()
  bkpTitle?: string;

  @Field(type => [CreateBKPchildren], {nullable:true, description: `BKP Children` })
  children?: CreateBKPchildren[];
  
}



